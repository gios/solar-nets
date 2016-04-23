import Immutable from 'immutable'
import { CHART_LEGEND, CHART_INTERVAL, CHART_PROPORTION } from '../actions/monitoringActions'

const monitoringState = Immutable.Map({
  legendHtml: '',
  startInterval: 0,
  endInterval: 10,
  chartWIdth: 0,
  chartHeight: 0
})

function monitoring(state = monitoringState, action) {
  switch (action.type) {
    case CHART_LEGEND:
      return state.merge({
        legendHtml: action.legendHtml
      })
    case CHART_INTERVAL:
      return state.merge({
        startInterval: action.startInterval,
        endInterval: action.endInterval
      })
    case CHART_PROPORTION:
      return state.merge({
        chartWIdth: action.chartWIdth,
        chartHeight: action.chartHeight
      })
    default:
      return state
  }
}

export default monitoring