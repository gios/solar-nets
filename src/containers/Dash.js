import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { onSimulationStart,
         onSimulationStop,
         onAddIterations,
         onPendingStop,
         onWaitingLastIteration,
         onInitializeNetRender,
         onGlobalDuration } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation, iterations, isPendingStop, waitingLastIteration, netRender, globalDuration } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  iterations={iterations}
                  isPendingStop={isPendingStop}
                  waitingLastIteration={waitingLastIteration}
                  netRender={netRender}
                  globalDuration={globalDuration}
                  onSimulationStart={() => dispatch(onSimulationStart())}
                  onSimulationStop={() => dispatch(onSimulationStop())}
                  onAddIterations={(value) => dispatch(onAddIterations(value))}
                  onPendingStop={(value) => dispatch(onPendingStop(value))}
                  onWaitingLastIteration={(value) => dispatch(onWaitingLastIteration(value))}
                  onInitializeNetRender={(value) => dispatch(onInitializeNetRender(value))}
                  onGlobalDuration={(value) => dispatch(onGlobalDuration(value))}/>
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
    netRender: state.dash.get('netRender'),
    globalDuration: state.dash.get('globalDuration')
  }
}

export default connect(injector)(Dash)