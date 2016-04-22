import React, { Component } from 'react'
import moment from 'moment'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'

Chart.defaults.global.responsive = true

class MonitoringChart extends Component {

  componentWillMount() {
    this.props.onGetNet()
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
          if (_.isObject(tmpChartStore[key])) tmpChartStore[key].push(item[key])
        }
      })

      for (let key in tmpChartStore) {
        if (tmpChartStore.hasOwnProperty(key)) {
          let element = tmpChartStore[key]
          let randomRGBA = () => {
            let randomColorRGBA = `rgba(${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, ${(Math.floor(Math.random() * 256))}, alpha)`

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
        let generatedLegendHtml = !_.isUndefined(this.refs.chart) ? this.refs.chart.getChart().generateLegend() : ''
        this.props.onChartLegend(generatedLegendHtml)
      })
    }

    return MonitoringChartRender
  }

  render() {
    return (
      <div>
        {this.renderMonitoringChart()}
        <div dangerouslySetInnerHTML={{ __html: this.props.legendHtml }}></div>
      </div>
    )
  }
}

export default MonitoringChart