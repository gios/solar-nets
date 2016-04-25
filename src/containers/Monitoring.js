import React, { Component } from 'react'
import { connect } from 'react-redux'
import MonitoringChart from '../components/monitoring/MonitoringChart'
import { onGetNet } from '../actions/dashActions'
import { onChartLegend, onChartInterval, onChartProportion, onChartForward } from '../actions/monitoringActions'

class Monitoring extends Component {

  render() {
    let { dispatch, dashGet, legendHtml, startInterval, endInterval, chartHeight, chartForward } = this.props

    return (
      <div className='col-md-12'>
        <MonitoringChart dashGet={dashGet}
                         legendHtml={legendHtml}
                         startInterval={startInterval}
                         endInterval={endInterval}
                         chartHeight={chartHeight}
                         chartForward={chartForward}
                         onGetNet={options => dispatch(onGetNet(options))}
                         onChartLegend={html => dispatch(onChartLegend(html))}
                         onChartInterval={(startInterval, endInterval) => dispatch(onChartInterval(startInterval, endInterval))}
                         onChartProportion={chartHeight => dispatch(onChartProportion(chartHeight))}
                         onChartForward={chartForward => dispatch(onChartForward(chartForward))}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    dashGet: state.dashGet.toJS(),
    legendHtml: state.monitoring.get('legendHtml'),
    startInterval: state.monitoring.get('startInterval'),
    endInterval: state.monitoring.get('endInterval'),
    chartHeight: state.monitoring.get('chartHeight'),
    chartForward: state.monitoring.get('chartForward')
  }
}

export default connect(injector)(Monitoring)
