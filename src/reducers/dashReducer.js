import Immutable from 'immutable'
import { SIMULATION_START, SIMULATION_STOP, ADD_ITERATIONS, PENDING_STOP } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false,
  iterations: 0,
  isPendingStop: false
})

const dash = (state = dashState, action) => {
  switch (action.type) {
    case SIMULATION_START:
      return state.merge({
        simulation: action.simulation
      })
    case SIMULATION_STOP:
      return state.merge({
        simulation: action.simulation
      })
    case ADD_ITERATIONS:
      return state.merge({
        iterations: action.iterations
      })
    case PENDING_STOP:
      return state.merge({
        isPendingStop: action.isPendingStop
      })
    default:
      return state
  }
}

export default dash