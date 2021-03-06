import Immutable from 'immutable'
import { SIMULATION_START,
         SIMULATION_STOP,
         ADD_ITERATIONS,
         PENDING_STOP,
         WAITING_LAST_ITERATION,
         INITIALIZE_NET_RENDER,
         GLOBAL_DURATION,
         REQUEST_SAVE_NET,
         SUCCESS_SAVE_NET,
         FAILURE_SAVE_NET,
         REQUEST_GET_NET,
         SUCCESS_GET_NET,
         FAILURE_GET_NET,
         REQUEST_DELETE_NET,
         SUCCESS_DELETE_NET,
         FAILURE_DELETE_NET } from '../actions/dashActions'

const dashState = Immutable.Map({
  simulation: false,
  iterations: 0,
  isPendingStop: false,
  waitingLastIteration: false,
  netRender: false,
  globalDuration: 5
})

const dashLoadState = Immutable.Map({
  isFetching: false,
  payload: null,
  error: false
})

export const dash = (state = dashState, action) => {
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

function dashInit(state, action, ...types) {
  let [REQUEST, SUCCESS, FAILURE] = types
  switch (action.type) {
    case REQUEST:
      return state.merge({
        isFetching: true,
        payload: null,
        error: false
      })
    case SUCCESS:
      return state.merge({
        isFetching: false,
        payload: action.payload,
        error: false
      })
    case FAILURE:
      return state.merge({
        isFetching: false,
        payload: action.payload.response,
        error: true
      })
    default:
      return state
  }
}

export function dashSave(state = dashLoadState, action) {
  return dashInit(state, action, REQUEST_SAVE_NET, SUCCESS_SAVE_NET, FAILURE_SAVE_NET)
}

export function dashGet(state = dashLoadState, action) {
  return dashInit(state, action, REQUEST_GET_NET, SUCCESS_GET_NET, FAILURE_GET_NET)
}

export function dashDelete(state = dashLoadState, action) {
  return dashInit(state, action, REQUEST_DELETE_NET, SUCCESS_DELETE_NET, FAILURE_DELETE_NET)
}