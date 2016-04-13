import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { simulationStart, simulationStop } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet onStartSimulation={() => dispatch(simulationStart())}
                  onStopSimulation={() => dispatch(simulationStop())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dashReducer.get('simulation')
  }
}

export default connect(injector)(Dash)