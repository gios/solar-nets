import Immutable from 'immutable'
import { CHART_LEGEND } from '../actions/monitoringActions'

const monitoringState = Immutable.Map({
  legendHtml: ''
})

function monitoring(state = monitoringState, action) {
  switch (action.type) {
    case CHART_LEGEND:
      return state.merge({
        legendHtml: action.legendHtml
      })
    default:
      return state
  }
}

export default monitoring