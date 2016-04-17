const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('history').then((exists) => {
      if(!exists) {
        return knex.schema.createTableIfNotExists('history', (table) => {
          table.increments()
          table.integer('consumed_solar_energy')
          table.integer('consumed_electro_energy')
          table.integer('electro_energy')
          table.integer('solar_energy')
          table.integer('sold_solar_energy')
          table.integer('needs')
          table.integer('price')
          table.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .then(() => logger.info('history table has been created'))
      }
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('history')
  ])
}
