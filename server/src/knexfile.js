'use strict'

let db_host = 'ec2-54-225-111-9.compute-1.amazonaws.com'
let db_user = 'xfqjbkwedeswug'
let db_password = 'BU_Tfd_UJNia_hYoZ6G-KpYp-p'
let db_name = 'dcu20n453qcuqt'

const DATABASE_URL = `postgres://${db_user}:${db_password}@${db_host}:5432/${db_name}?ssl=true`

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