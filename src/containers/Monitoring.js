import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonitoringChart from '../components/monitoring/MonitoringChart'
import { onGetNet } from '../actions/dashActions'

class Monitoring extends Component {

  render() {
    let { dispatch, dashGet } = this.props

    return (
      <div className='col-md-12'>
        <MonitoringChart dashGet={dashGet}
                         onGetNet={() => dispatch(onGetNet())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    dashGet: state.dashGet.toJS()
  }
}

export default connect(injector)(Monitoring)
