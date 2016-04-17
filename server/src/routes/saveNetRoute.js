module.exports = function(router) {
  'use strict';

  const knex = require('../knexConfig.js')

  router.post('/save_net', function *() {
    let consumedSolarEnergy = this.request.body.consumedSolarEnergy
    let consumedElectroEnergy = this.request.body.consumedElectroEnergy
    let electroEnergy = this.request.body.electroEnergy
    let solarEnergy = this.request.body.solarEnergy
    let soldSolarEnergy = this.request.body.soldSolarEnergy
    let needs = this.request.body.needs

    console.log(consumedSolarEnergy, consumedElectroEnergy, electroEnergy, solarEnergy, soldSolarEnergy, needs)
    this.body = 'hello'
  })
}
