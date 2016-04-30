import React, { Component } from 'react'
import moment from 'moment'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'
import Loader from '../others/Loader'
import { NotificationManager } from 'react-notifications'
import { throttle } from '../../utils/helpers'
import { CHART_INTERVAL_LIMIT, CHART_COLOR_PALETTE } from '../../constants'

Chart.defaults.global.responsive = true

class MonitoringChart extends Component {

  componentWillMount() {
    this.props.onGetNet({
      start: this.props.startInterval,
      end: this.props.endInterval
    })
  }

  componentDidMount() {
    window.addEventListener('resize', throttle(() => {
      if(this.refs.chart) {
        let { height } = this.refs.chart.getChart().chart
        this.props.onChartProportion(height)
      }
    }, 200))
  }

  renderMonitoringChart() {
    let MonitoringChartRender, tmpChartStore = {}, chartData = {}
    let { dashGet } = this.props

    chartData.labels = []
    chartData.datasets = []

    if(dashGet.payload) {
      dashGet.payload.map((item) => {
        chartData.labels.push(moment(item.created_at).format('D MMM YYYY HH:mm:ss'))

        for(let key in item) {
          if(_.isUndefined(tmpChartStore[key])) tmpChartStore[key] = []
          if(_.isObject(tmpChartStore[key])) tmpChartStore[key].push(item[key])
        }
      })

      for (let key in tmpChartStore) {
        if (tmpChartStore.hasOwnProperty(key)) {
          let element = tmpChartStore[key]
          let index = Object.keys(tmpChartStore).indexOf(key)

          let randomRGBA = () => {
            let randomColorRGBA = CHART_COLOR_PALETTE[index]
            return (alpha) => randomColorRGBA.replace('alpha', alpha)
          }

          if((key !== 'created_at') && (key !== 'id')) {
            let randomColorString = randomRGBA()

            chartData.datasets.push({
              label: _.startCase(key),
              fillColor: randomColorString(0.5),
              strokeColor: 'rgba(220, 220, 220, 0.8)',
              highlightFill: randomColorString(0.75),
              highlightStroke: 'rgba(220, 220, 220, 1)',
              data: element
            })
          }
        }
      }

      MonitoringChartRender = <Bar data={chartData} ref='chart'/>
      _.defer(() => {
        if(this.refs.chart) {
          let generatedLegendHtml = this.refs.chart.getChart().generateLegend()
          let { height } = this.refs.chart.getChart().chart
          this.props.onChartProportion(height)
          !this.props.legendHtml && this.props.onChartLegend(generatedLegendHtml)
        }

        if(dashGet.payload.length <= CHART_INTERVAL_LIMIT) {
          this.props.onChartForward(false)
        } else {
          this.props.onChartForward(true)
        }
      })
    } else {
      MonitoringChartRender = <Loader size={5}/>
    }

    return MonitoringChartRender
  }

  previousChartInterval(e) {
    e.preventDefault()
    let { startInterval, endInterval } = this.props

    if(startInterval === 0 && endInterval <= CHART_INTERVAL_LIMIT) {
      NotificationManager.warning('You can only move forward', 'Move forward', 10000)
    } else {
      this.props.onChartInterval(startInterval - CHART_INTERVAL_LIMIT, endInterval - CHART_INTERVAL_LIMIT).then((action) => {
        this.props.onGetNet({
          start: action.startInterval,
          end: action.endInterval
        }).then((status) => {
          if(status.payload.length <= CHART_INTERVAL_LIMIT) {
            this.props.onChartForward(false)
          } else {
            this.props.onChartForward(true)
          }
        })
      })
    }
  }

  nextChartInterval(e) {
    e.preventDefault()
    let { startInterval, endInterval, chartForward } = this.props

    if(chartForward) {
      this.props.onChartInterval(startInterval + CHART_INTERVAL_LIMIT, endInterval + CHART_INTERVAL_LIMIT).then((action) => {
        this.props.onGetNet({
          start: action.startInterval,
          end: action.endInterval
        }).then((status) => {
          if(status.payload.length <= CHART_INTERVAL_LIMIT) {
            this.props.onChartForward(false)
          } else {
            this.props.onChartForward(true)
          }
        })
      })
    } else {
      NotificationManager.warning('You are staying on the last chart interval', 'Last Interval', 10000)
    }
  }

  disablePaginationClassByForward(chartForward) {
    return chartForward ? '' : 'disabled'
  }

  disablePaginationClassByInterval(startInterval, endInterval) {
    return startInterval === 0 && endInterval <= CHART_INTERVAL_LIMIT ? 'disabled' : ''
  }

  render() {
    let { startInterval, endInterval, chartHeight, chartForward, legendHtml, dashGet } = this.props

    if((startInterval === 0) && (dashGet.payload && _.isEmpty(dashGet.payload))) {
      return (
        <div className='alert alert-warning' role='alert'>
          <strong>Warning!</strong> You are need to create at least one net iteration
        </div>
      )
    }

    return (
      <div>
        <div style={{ height: chartHeight }}>
          {this.renderMonitoringChart()}
        </div>
        <div className='card-deck'>
          <div className='card'>
            <div className='chart-legend' dangerouslySetInnerHTML={{ __html: legendHtml }}></div>
          </div>
          <div className='card'>
            <div className='chart-pagination'>
              <h4 className='card-title text-xs-center'>Next Chart</h4>
              <nav>
                <ul className='pager'>
                  <li className={this.disablePaginationClassByInterval(startInterval, endInterval)}>
                    <a href='javascript:void(0)' onClick={this.previousChartInterval.bind(this)}>Previous</a>
                  </li>
                  <li className='m-x-1'>{`${startInterval} - ${endInterval}`}</li>
                  <li className={this.disablePaginationClassByForward(chartForward)}>
                    <a href='javascript:void(0)' onClick={this.nextChartInterval.bind(this)}>Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MonitoringChart