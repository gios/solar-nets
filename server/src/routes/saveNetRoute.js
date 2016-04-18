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

    const greenPrice = 0.27

    let insertNetId = yield knex('history')
      .returning('id')
      .insert({
        consumed_solar_energy: consumedSolarEnergy,
        consumed_electro_energy: consumedElectroEnergy,
        electro_energy: electroEnergy,
        solar_energy: solarEnergy,
        sold_solar_energy: soldSolarEnergy,
        needs: needs,
        price: parseInt((soldSolarEnergy * greenPrice).toFixed(0))
      })

    this.body = { id: insertNetId[0] }
  })

  router.get('/get_net', function *() {
    let getNet = yield knex('history').select('*')

    this.body = getNet
  })

  router.del('/delete_net', function *() {
    let getNet = yield knex('history').delete('*')

    this.body = getNet
  })
}
