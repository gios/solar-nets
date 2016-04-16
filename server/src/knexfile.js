'use strict'

let db_host = ''
let db_user = ''
let db_password = ''
let db_name = 't'

const DATABASE_URL = `postgres://${db_user}:${db_password}@${db_host}:5432/d${db_name}?ssl=true`

module.exports = {
  client: 'postgresql',
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}