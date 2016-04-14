import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { onSimulationStart,
         onSimulationStop,
         onAddIterations,
         onPendingStop,
         onWaitingLastIteration,
         onInitializeNetRender } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation, iterations, isPendingStop, waitingLastIteration, netRender } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  iterations={iterations}
                  isPendingStop={isPendingStop}
                  waitingLastIteration={waitingLastIteration}
                  netRender={netRender}
                  onSimulationStart={() => dispatch(onSimulationStart())}
                  onSimulationStop={() => dispatch(onSimulationStop())}
                  onAddIterations={(value) => dispatch(onAddIterations(value))}
                  onPendingStop={(value) => dispatch(onPendingStop(value))}
                  onWaitingLastIteration={(value) => dispatch(onWaitingLastIteration(value))}
                  onInitializeNetRender={() => dispatch(onInitializeNetRender())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dash.get('simulation'),
    iterations: state.dash.get('iterations'),
    isPendingStop: state.dash.get('isPendingStop'),
    waitingLastIteration: state.dash.get('waitingLastIteration'),
    netRender: state.dash.get('netRender')
  }
}

export default connect(injector)(Dash)