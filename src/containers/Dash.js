import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { simulationStart, simulationStop } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  onStartSimulation={() => dispatch(simulationStart())}
                  onStopSimulation={() => dispatch(simulationStop())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dash.get('simulation')
  }
}

export default connect(injector)(Dash)