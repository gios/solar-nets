import React, { Component } from 'react'
import joint from 'jointjs'
import {
  pinnacleConsumer,
  pinnacleNeeds,
  pinnacleConsumedSolarEnergy,
  pinnacleSolarStation,
  pinnacleElectroStation,
  pinnacleElectroEnergy,
  pinnacleConsumedElectroEnergy,
  pinnacleSolarEnergy,
  pinnacleSoldSolarEnergy,
  pinnacleP7,
  pinnacleP5,
  pinnacleSellingSolarEnergy
} from './pinnacles'
import { link } from './linkConnections'
import {
  getTimeTransition,
  transitionT1,
  transitionT2,
  transitionT3,
  transitionT4,
  transitionT5,
  transitionT6,
  transitionT7,
  transitionT8
} from './transitions'
import fireTransition from './transitionAnimation'

class SolarNet extends Component {

  componentDidMount() {
    let graph = new joint.dia.Graph()
    let paper = new joint.dia.Paper({
      el: $('#solar-petri-net'),
      width: 1200,
      height: 750,
      gridSize: 10,
      perpendicularLinks: true,
      interactive: false,
      interaction: false,
      model: graph
    })

    graph.addCell([
      // Pinnacles
      pinnacleConsumer,
      pinnacleNeeds,
      pinnacleConsumedSolarEnergy,
      pinnacleSolarStation,
      pinnacleElectroStation,
      pinnacleElectroEnergy,
      pinnacleConsumedElectroEnergy,
      pinnacleSolarEnergy,
      pinnacleSoldSolarEnergy,
      pinnacleP7,
      pinnacleP5,
      pinnacleSellingSolarEnergy,

      // Transitions
      transitionT3,
      transitionT5,
      transitionT1,
      transitionT2,
      transitionT4,
      transitionT7,
      transitionT8,
      transitionT6
    ])

    graph.addCell([
      link(pinnacleConsumer, transitionT3),
      link(transitionT3, pinnacleConsumer),
      link(transitionT3, pinnacleNeeds, {label: '100'}),
      link(pinnacleNeeds, transitionT5),
      link(pinnacleNeeds, transitionT4),
      link(transitionT5, pinnacleConsumedSolarEnergy),
      link(pinnacleSolarStation, transitionT1),
      link(transitionT1, pinnacleSolarStation),
      link(transitionT1, pinnacleSolarEnergy, {label: '1200'}),
      link(pinnacleElectroStation, transitionT2),
      link(transitionT2, pinnacleElectroStation),
      link(transitionT2, pinnacleElectroEnergy, {label: '200'}),
      link(pinnacleElectroEnergy, transitionT4),
      link(transitionT4, pinnacleConsumedElectroEnergy),
      link(pinnacleSolarEnergy, transitionT7, {label: '1100'}),
      link(pinnacleSolarEnergy, transitionT5),
      link(transitionT7, pinnacleSoldSolarEnergy, {label: '1000'}),
      link(transitionT8, pinnacleP7),
      link(pinnacleP5, transitionT8),
      link(pinnacleP5, transitionT7, {dotted: true}),
      link(pinnacleSellingSolarEnergy, transitionT6),
      link(transitionT6, pinnacleSellingSolarEnergy),
      link(transitionT6, pinnacleP5)
    ])

    function simulate() {
      let transitions = [
        transitionT3,
        transitionT5,
        transitionT1,
        transitionT2,
        transitionT4,
        transitionT7,
        transitionT8,
        transitionT6
      ]

      console.log(getTimeTransition(transitionT1))

      return setInterval(() => {
        _.each(transitions, (transition) => {
          fireTransition(graph, paper, transition, 1)
        })
      }, 5000)
    }

    this.simulationId = simulate()
  }

  stopSimulation(simulationId) {
    clearInterval(simulationId)
  }

  componentWillUnmount() {
    this.stopSimulation(this.simulationId)
  }

  render() {
    return (
      <div className='col-md-12'>
        <div id='solar-petri-net'></div>
      </div>
    )
  }
}

export default SolarNet