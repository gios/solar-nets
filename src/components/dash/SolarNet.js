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

    this.state = {
      waitingLastIteration: false
    }
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
  }

  componentWillUnmount() {
    this.graph.clear()
    this.paper.remove()
  }

  startInfinityTransition() {
    let { onAddIterations, onSetPendingStop } = this.props
    onSetPendingStop(false)
    this.props.onSimulationStart()

    function simulate(graph, paper, transitions) {
      fireTransition(graph, paper, transitions, (iterations) => {
        if(!this.props.isPendingStop) {
          simulate.call(this, graph, paper, transitions)
          onAddIterations(iterations)
        } else {
          this.props.onSimulationStop()
          this.stopAnimationBtnStop(this.refs.stopSimulation)
          onAddIterations(iterations)
        }
      })
    }

    simulate.call(this, this.graph, this.paper, this.transitions)
  }

  startTransitionOnce() {
    let { onAddIterations, onSetPendingStop } = this.props
    onSetPendingStop(false)
    this.props.onSimulationStart()

    function simulate(graph, paper, transitions) {
      fireTransition(graph, paper, transitions, (iterations) => {
        this.props.onSimulationStop()
        this.stopAnimationBtnStop(this.refs.stopSimulation)
        onAddIterations(iterations)
      })
    }

    simulate.call(this, this.graph, this.paper, this.transitions)
  }

  stopTransition() {
    this.startAnimationBtnStop(this.refs.stopSimulation)
    this.props.onSetPendingStop(true)
  }

  startAnimationBtnStop(elem) {
    this.setState({ waitingLastIteration: true }, () => {
      $(elem).html(`<i class='fa fa-refresh fa-spin'></i> Waiting for last iteration...`)
    })
  }

  stopAnimationBtnStop(elem) {
    this.setState({ waitingLastIteration: false }, () => {
      $(elem).html(`Stop Simulation`)
    })
  }

  render() {
    let { simulation, iterations } = this.props
    return (
      <div className='text-xs-center'>
        <h5 className='iterations-counter'>
          Iterations: <span className='label label-default'>{iterations}</span>
        </h5>
        <div id='solar-petri-net'></div>
        <button onClick={this.startTransitionOnce.bind(this)}
                type='button'
                className='btn btn-primary m-x-1'
                disabled={simulation}>Start Simulation</button>
        <button onClick={this.startInfinityTransition.bind(this)}
                type='button'
                className='btn btn-primary m-x-1'
                disabled={simulation}>Start Infinity Simulation</button>
        <button onClick={this.stopTransition.bind(this)}
                type='button'
                ref='stopSimulation'
                className='btn btn-danger m-x-1'
                disabled={!simulation || this.state.waitingLastIteration}>Stop Simulation</button>
      </div>
    )
  }
}

export default SolarNet