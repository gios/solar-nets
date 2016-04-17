const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('history').then((exists) => {
      if(!exists) {
        return knex.schema.createTableIfNotExists('history', (table) => {
          table.increments()
          table.integer('Consumed Solar Energy')
          table.integer('Consumed Electro Energy')
          table.integer('Needs')
          table.integer('Price')
          table.timestamps()
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
