import React, { Component } from 'react'
import { connect } from 'react-redux'
import SolarNet from '../components/dash/SolarNet'
import { simulationStart, simulationStop, addIterations } from '../actions/dashActions'

class Dash extends Component {

  render() {
    let { dispatch, simulation, iterations } = this.props
    return (
      <div className='col-md-12'>
        <SolarNet simulation={simulation}
                  iterations={iterations}
                  onStartSimulation={() => dispatch(simulationStart())}
                  onStopSimulation={() => dispatch(simulationStop())}
                  onAddIterations={(value) => dispatch(addIterations(value))}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    simulation: state.dash.get('simulation'),
    iterations: state.dash.get('iterations')
  }
}

export default connect(injector)(Dash)