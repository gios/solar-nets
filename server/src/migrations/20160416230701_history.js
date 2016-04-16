const logger = require('tracer').colorConsole()

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('history').then((exists) => {
      if(!exists) {
        return knex.schema.createTableIfNotExists('history', (table) => {
          table.increments()
          table.string('Consumed Solar Energy')
          table.string('Consumed Electro Energy')
          table.string('Needs')
          table.string('Price')
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
