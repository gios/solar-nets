import Immutable from 'immutable'
import { SIMULATION_START, SIMULATION_STOP } from '../actions/dashActions'

const dashDefault = Immutable.Map({
  simulation: false
})

const dashReducer = (state = dashDefault, action) => {
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

export default dashReducer