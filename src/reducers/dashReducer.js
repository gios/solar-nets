import Immutable from 'immutable'
import { SIMULATION_START, SIMULATION_STOP } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false
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
    default:
      return state
  }
}

export default dash