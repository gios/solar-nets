import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { onSimulationStart, onSimulationStop, onAddIterations, onPendingStop, onWaitingLastIteration } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation, iterations, isPendingStop, waitingLastIteration } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  iterations={iterations}
                  isPendingStop={isPendingStop}
                  waitingLastIteration={waitingLastIteration}
                  onSimulationStart={() => dispatch(onSimulationStart())}
                  onSimulationStop={() => dispatch(onSimulationStop())}
                  onAddIterations={(value) => dispatch(onAddIterations(value))}
                  onPendingStop={(value) => dispatch(onPendingStop(value))}
                  onWaitingLastIteration={(value) => dispatch(onWaitingLastIteration(value))}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dash.get('simulation'),
    iterations: state.dash.get('iterations'),
    isPendingStop: state.dash.get('isPendingStop'),
    waitingLastIteration: state.dash.get('waitingLastIteration')
  }
}

export default connect(injector)(Dash)