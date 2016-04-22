import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonitoringChart from '../components/monitoring/MonitoringChart'
import { onGetNet } from '../actions/dashActions'
import { onChartLegend } from '../actions/monitoringActions'

class Monitoring extends Component {

  render() {
    let { dispatch, dashGet, legendHtml } = this.props

    return (
      <div className='col-md-12'>
        <MonitoringChart dashGet={dashGet}
                         legendHtml={legendHtml}
                         onGetNet={options => dispatch(onGetNet(options))}
                         onChartLegend={html => dispatch(onChartLegend(html))}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    dashGet: state.dashGet.toJS(),
    legendHtml: state.monitoring.get('legendHtml')
  }
}

export default connect(injector)(Monitoring)
