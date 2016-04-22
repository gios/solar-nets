import React, { Component } from 'react'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs'

Chart.defaults.global.responsive = true

class MonitoringChart extends Component {

  componentWillMount() {
    this.props.onGetNet()
  }

  renderMonitoringChart() {
    let MonitoringChartRender, chartData = {}
    let tmpChartStore = {
      consumed_electro_energy: [],
      consumed_solar_energy: [],
      electro_energy: [],
      needs: [],
      price: [],
      solar_energy: [],
      sold_solar_energy: []
    }
    let { dashGet } = this.props

    chartData.labels = [
      '#',
      'Needs',
      'Consumed Solar Energy',
      'Consumed Electro Energy',
      'Solar Energy',
      'Electro Energy',
      'Sold Solar Energy',
      'Price',
      'Created Date'
    ]
    chartData.datasets = []

    if(dashGet.payload) {
      dashGet.payload.map((item, index) => {
        chartData.labels.push(index + 1)

        for(let value in item) {
          console.log(tmpChartStore, typeof value, value)
          tmpChartStore[value].push(item[value])
        }
      })

      console.log(tmpChartStore)

      MonitoringChartRender = <Bar data={chartData}/>
    }

    return MonitoringChartRender
  }

  render() {
    return (
      <div>Hello Monitoring!
        {this.renderMonitoringChart()}
      </div>
    )
  }
}

export default MonitoringChart