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
import NetControls from './NetControls'

class SolarNet extends Component {

  constructor(props) {
    super(props)
    this.transitions = [
      transitionT3,
      transitionT5,
      transitionT1,
      transitionT2,
      transitionT4,
      transitionT7,
      transitionT8,
      transitionT6
    ]
  }

  componentDidMount() {
    this.graph = new joint.dia.Graph()
    this.paper = new joint.dia.Paper({
      el: $('#solar-petri-net'),
      width: 1050,
      height: 650,
      gridSize: 10,
      perpendicularLinks: true,
      interactive: false,
      interaction: false,
      model: this.graph
    })

    this.graph.addCell([
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
      this.transitions
    ])

    this.graph.addCell([
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

    this.props.onInitializeNetRender(true)
  }

  componentWillReceiveProps(nextProps) {
    let consumedSolarEnergy = pinnacleConsumedSolarEnergy.get('tokens') || 0
    let consumedElectroEnergy = pinnacleConsumedElectroEnergy.get('tokens') || 0
    let electroEnergy = pinnacleElectroEnergy.get('tokens') || 0
    let solarEnergy = pinnacleSolarEnergy.get('tokens') || 0
    let soldSolarEnergy = pinnacleSoldSolarEnergy.get('tokens') || 0
    let needs = pinnacleNeeds.get('tokens') || 0

    if(nextProps.iterations > this.props.iterations) {
      this.props.onSaveNet({
        consumedSolarEnergy,
        consumedElectroEnergy,
        electroEnergy,
        solarEnergy,
        soldSolarEnergy,
        needs
      })
    }
  }

  componentWillUnmount() {
    this.props.onInitializeNetRender(false)
    this.graph.clear()
    this.paper.remove()
  }

  startInfinityTransition(stopSimulationRef) {
    let { onAddIterations, onPendingStop, globalDuration } = this.props
    onPendingStop(false)
    this.props.onSimulationStart()

    function simulate(graph, paper, transitions) {
      fireTransition(graph, paper, transitions, globalDuration, (iterations) => {
        if(!this.props.isPendingStop) {
          simulate.call(this, graph, paper, transitions)
          onAddIterations(iterations)
        } else {
          this.props.onSimulationStop()
          this.stopAnimationBtnStop(stopSimulationRef)
          onAddIterations(iterations)
        }
      })
    }

    simulate.call(this, this.graph, this.paper, this.transitions)
  }

  startTransitionOnce(stopSimulationRef) {
    let { onAddIterations, onPendingStop, globalDuration } = this.props
    onPendingStop(false)
    this.props.onSimulationStart()

    function simulate(graph, paper, transitions) {
      fireTransition(graph, paper, transitions, globalDuration, (iterations) => {
        this.props.onSimulationStop()
        this.stopAnimationBtnStop(stopSimulationRef)
        onAddIterations(iterations)
      })
    }

    simulate.call(this, this.graph, this.paper, this.transitions)
  }

  stopTransition(stopSimulationRef) {
    this.startAnimationBtnStop(stopSimulationRef)
    this.props.onPendingStop(true)
  }

  startAnimationBtnStop(elem) {
    this.props.onWaitingLastIteration(true)
    $(elem).html(`<i class='fa fa-refresh fa-spin'></i> Waiting for last iteration...`)
  }

  stopAnimationBtnStop(elem) {
    this.props.onWaitingLastIteration(false)
    $(elem).html(`Stop Simulation`)
  }

  render() {
    let { simulation, iterations, waitingLastIteration, netRender, globalDuration, onGlobalDuration, netSave } = this.props
    return (
      <div className='text-xs-center'>
        <h5 className='iterations-counter'>
          Iterations: <span className='label label-default'>{iterations}</span><br/>
          Writing: {netSave.isFetching ? <div className='point-status red'></div> : <div className='point-status green'></div>}
        </h5>
        <div id='solar-petri-net'></div>
        {netRender && <NetControls simulation={simulation}
                                   waitingLastIteration={waitingLastIteration}
                                   graph={this.graph}
                                   consumerTransition={transitionT3}
                                   solarStationTransition={transitionT1}
                                   electroStationTransition={transitionT2}
                                   globalDuration={globalDuration}
                                   onGlobalDuration={onGlobalDuration}
                                   startInfinityTransition={this.startInfinityTransition.bind(this)}
                                   startTransitionOnce={this.startTransitionOnce.bind(this)}
                                   stopTransition={this.stopTransition.bind(this)}/>
        }
      </div>
    )
  }
}

export default SolarNet
