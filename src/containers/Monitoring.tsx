import * as React from 'react'
import { connect } from 'react-redux'
import MonitoringChart from '../components/monitoring/MonitoringChart'
import { onGetNet } from '../actions/dashActions'
import { onChartLegend, onChartInterval, onChartProportion, onChartForward } from '../actions/monitoringActions'

function injector(state) {
  return {
    dashGet: state.dashGet.toJS(),
    monitoring: state.monitoring.toJS()
  }
}

@connect(injector)
class Monitoring extends React.Component {

  render() {
    let { dispatch, dashGet, monitoring } = this.props

    return (
      <div className='col-md-12'>
        <MonitoringChart dashGet={dashGet}
                         {...monitoring}
                         onGetNet={options => dispatch(onGetNet(options))}
                         onChartLegend={html => dispatch(onChartLegend(html))}
                         onChartInterval={(startInterval, endInterval) => dispatch(onChartInterval(startInterval, endInterval))}
                         onChartProportion={chartHeight => dispatch(onChartProportion(chartHeight))}
                         onChartForward={chartForward => dispatch(onChartForward(chartForward))}/>
      </div>
    )
  }
}

export default Monitoring
