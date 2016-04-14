import React, { Component } from 'react'
import { setConsumerValue,
         getConsumerValue,
         setSolarStationValue,
         getSolarStationValue,
         setElectroStationValue,
         getElectroStationValue } from './linkConnections'

class NetControls extends Component {

  onChangeNeeds(e) {
    let { graph, consumerTransition } = this.props
    let value = e.target.value

    if(this.validateValues(value)) {
      setConsumerValue(graph, consumerTransition, value)
    } else {
      e.target.value = 1
    }
  }

  onChangeSolarStation(e) {
    let { graph, solarStationTransition } = this.props
    let value = e.target.value

    if(this.validateValues(value)) {
      setSolarStationValue(graph, solarStationTransition, value)
    } else {
      e.target.value = 1
    }
  }

  onChangeElectroStation(e) {
    let { graph, electroStationTransition } = this.props
    let value = e.target.value

    if(this.validateValues(value)) {
      setElectroStationValue(graph, electroStationTransition, value)
    } else {
      e.target.value = 1
    }
  }

  validateValues(value) {
    if(/^\d{1,4}$/g.test(value)) {
      return true
    }
    return false
  }

  render() {
    let { simulation, waitingLastIteration, graph } = this.props
    let { consumerTransition, solarStationTransition, electroStationTransition } = this.props
    return (
      <div className='card-group'>
        <div className='card'>
          <h4 className='card-title m-t-1'>Simulation Controls</h4>
          <button onClick={() => this.props.startTransitionOnce(this.refs.stopSimulation)}
                  type='button'
                  className='btn btn-primary m-a-1'
                  disabled={simulation}>Start Simulation</button>
          <button onClick={() => this.props.startInfinityTransition(this.refs.stopSimulation)}
                  type='button'
                  className='btn btn-primary m-a-1'
                  disabled={simulation}>Start Infinity Simulation</button>
          <button onClick={() => this.props.stopTransition(this.refs.stopSimulation)}
                  type='button'
                  ref='stopSimulation'
                  className='btn btn-danger m-a-1'
                  disabled={!simulation || waitingLastIteration}>Stop Simulation</button>
        </div>
        <div className='card'>
          <h4 className='card-title m-t-1'>Predefined Data</h4>
          <form className='m-x-1'>
            <fieldset className='form-group'>
              <label for='InputNeeds'>Needs</label>
              <input type='number'
                     min='1'
                     max='9999'
                     className='form-control'
                     id='InputNeeds'
                     placeholder='Enter needs'
                     onChange={this.onChangeNeeds.bind(this)}
                     defaultValue={getConsumerValue(graph, consumerTransition)}/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 9999.</small>
            </fieldset>
            <fieldset className='form-group'>
              <label for='InputSolarStation'>Solar Station Power</label>
              <input type='number'
                     min='1'
                     max='9999'
                     className='form-control'
                     id='InputSolarStation'
                     placeholder='Enter solar station power'
                     onChange={this.onChangeSolarStation.bind(this)}
                     defaultValue={getSolarStationValue(graph, solarStationTransition)}/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 9999.</small>
            </fieldset>
            <fieldset className='form-group'>
              <label for='InputElectroStation'>Electro Station Power</label>
              <input type='number'
                     min='1'
                     max='9999'
                     className='form-control'
                     id='InputElectroStation'
                     placeholder='Enter electro station power'
                     onChange={this.onChangeElectroStation.bind(this)}
                     defaultValue={getElectroStationValue(graph, electroStationTransition)}/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 9999.</small>
            </fieldset>
          </form>
        </div>
        <div className='card'>
          <h4 className='card-title m-t-1'>Other Settings</h4>
        </div>
      </div>
    )
  }
}

export default NetControls
