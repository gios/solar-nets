import Immutable from 'immutable'
import { ANALYZE_DELETE_BUTTON, ANALYZE_DELETE_TIMER } from '../actions/analyzeActions'

const analyzeState = Immutable.Map({
  activeDeleteButton: false,
  timerId: null
})

function analyze(state = analyzeState, action) {
  switch (action.type) {
    case ANALYZE_DELETE_BUTTON:
      return state.merge({
        activeDeleteButton: action.activeDeleteButton
      })
    case ANALYZE_DELETE_TIMER:
      return state.merge({
        timerId: action.timerId
      })
    default:
      return state
  }
}

export default analyze