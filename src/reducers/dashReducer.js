import Immutable from 'immutable'
import { SIMULATION_START, SIMULATION_STOP } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false
})

const dashView = (state = dashState, action) => {
  switch (action.type) {
    case SIMULATION_START:
      return state.merge({
        simulation: true
      })
    case SIMULATION_STOP:
      return state.merge({
        simulation: false
      })
    default:
      return state
  }
}

export default dashView