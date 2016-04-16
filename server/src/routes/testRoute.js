module.exports = function(router) {
  'use strict';

  // const knex = require('../knexfile.js')

  router.get('/test', function *() {
    this.body = 'test'
  })
}
