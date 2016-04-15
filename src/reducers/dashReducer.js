import Immutable from 'immutable'
import { SIMULATION_START,
         SIMULATION_STOP,
         ADD_ITERATIONS,
         PENDING_STOP,
         WAITING_LAST_ITERATION,
         INITIALIZE_NET_RENDER,
         GLOBAL_DURATION } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false,
  iterations: 0,
  isPendingStop: false,
  waitingLastIteration: false,
  netRender: false,
  globalDuration: 5
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
    case WAITING_LAST_ITERATION:
      return state.merge({
        waitingLastIteration: action.waitingLastIteration
      })
    case INITIALIZE_NET_RENDER:
      return state.merge({
        netRender: action.netRender
      })
    case GLOBAL_DURATION:
      return state.merge({
        globalDuration: action.globalDuration
      })
    default:
      return state
  }
}

export default dash