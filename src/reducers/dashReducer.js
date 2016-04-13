import Immutable from 'immutable'
import { SIMULATION_START, SIMULATION_STOP, ADD_ITERATIONS } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false,
  iterations: 0
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
    default:
      return state
  }
}

export default dash