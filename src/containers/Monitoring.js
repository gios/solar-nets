import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonitoringChart from '../components/monitoring/MonitoringChart'

class Monitoring extends Component {

  render() {
    let { dispatch } = this.props

    return (
      <div className='col-md-12'>
        <MonitoringChart/>
      </div>
    )
  }
}

function injector(state) {
  return state
}

export default connect(injector)(Monitoring)
