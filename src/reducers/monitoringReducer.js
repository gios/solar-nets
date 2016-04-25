import Immutable from 'immutable'
import { CHART_LEGEND, CHART_INTERVAL, CHART_PROPORTION, CHART_FORWARD } from '../actions/monitoringActions'

const monitoringState = Immutable.Map({
  legendHtml: '',
  startInterval: 0,
  endInterval: 12,
  chartHeight: 400,
  chartForward: true
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
        chartHeight: action.chartHeight
      })
    case CHART_FORWARD:
      return state.merge({
        chartForward: action.chartForward
      })
    default:
      return state
  }
}

export default monitoring