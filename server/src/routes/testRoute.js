module.exports = function(router) {
  'use strict';

//   const knex = require('../knexConfig.js')

  router.get('/test', function *() {
    this.body = 'test'
  })
}
