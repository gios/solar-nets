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

    let insertNetId = yield knex('history')
      .returning('id')
      .insert({
        consumed_solar_energy: consumedSolarEnergy,
        consumed_electro_energy: consumedElectroEnergy,
        electro_energy: electroEnergy,
        solar_energy: solarEnergy,
        sold_solar_energy: soldSolarEnergy,
        needs: needs,
        price: soldSolarEnergy * 0.27
      })

    this.body = { id: insertNetId[0] }
  })
}
