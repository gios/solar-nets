module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: true,
  pool: {
    min: 1,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
