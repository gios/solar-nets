import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { onSimulationStart, onSimulationStop, onAddIterations, onPendingStop } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation, iterations, isPendingStop } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  iterations={iterations}
                  isPendingStop={isPendingStop}
                  onSimulationStart={() => dispatch(onSimulationStart())}
                  onSimulationStop={() => dispatch(onSimulationStop())}
                  onAddIterations={(value) => dispatch(onAddIterations(value))}
                  onPendingStop={(value) => dispatch(onPendingStop(value))}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dash.get('simulation'),
    iterations: state.dash.get('iterations'),
    isPendingStop: state.dash.get('isPendingStop')
  }
}

export default connect(injector)(Dash)