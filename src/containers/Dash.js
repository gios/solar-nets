import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { onSimulationStart,
         onSimulationStop,
         onAddIterations,
         onPendingStop,
         onWaitingLastIteration,
         onInitializeNetRender,
         onGlobalDuration,
         onSaveNet } from '../actions/dashActions'

function injector(state) {
  return {
    dash: state.dash.toJS(),
    netSave: state.dashSave.toJS()
  }
}

@connect(injector)
class Dash extends Component {

  render() {
    let { dispatch, dash, netSave } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet {...dash}
                  netSave={netSave}
                  onSimulationStart={() => dispatch(onSimulationStart())}
                  onSimulationStop={() => dispatch(onSimulationStop())}
                  onAddIterations={value => dispatch(onAddIterations(value))}
                  onPendingStop={value => dispatch(onPendingStop(value))}
                  onWaitingLastIteration={value => dispatch(onWaitingLastIteration(value))}
                  onInitializeNetRender={value => dispatch(onInitializeNetRender(value))}
                  onGlobalDuration={value => dispatch(onGlobalDuration(value))}
                  onSaveNet={value => dispatch(onSaveNet(value))}/>
      </div>
    )
  }
}

export default Dash