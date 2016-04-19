import { CALL_API } from 'redux-api-middleware'

export const SIMULATION_START = 'SIMULATION_START'
export const SIMULATION_STOP = 'SIMULATION_STOP'
export const ADD_ITERATIONS = 'ADD_ITERATIONS'
export const PENDING_STOP = 'PENDING_STOP'
export const WAITING_LAST_ITERATION = 'WAITING_LAST_ITERATION'
export const INITIALIZE_NET_RENDER = 'INITIALIZE_NET_RENDER'
export const GLOBAL_DURATION = 'GLOBAL_DURATION'

export const REQUEST_SAVE_NET = 'REQUEST_SAVE_NET'
export const SUCCESS_SAVE_NET = 'SUCCESS_SAVE_NET'
export const FAILURE_SAVE_NET = 'FAILURE_SAVE_NET'

export const REQUEST_GET_NET = 'REQUEST_GET_NET'
export const SUCCESS_GET_NET = 'SUCCESS_GET_NET'
export const FAILURE_GET_NET = 'FAILURE_GET_NET'

export const REQUEST_DELETE_NET = 'REQUEST_DELETE_NET'
export const SUCCESS_DELETE_NET = 'SUCCESS_DELETE_NET'
export const FAILURE_DELETE_NET = 'FAILURE_DELETE_NET'

export const onSimulationStart = () => {
  return {
    type: SIMULATION_START,
    simulation: true
  }
}

export const onSimulationStop = () => {
  return {
    type: SIMULATION_STOP,
    simulation: false
  }
}

export const onAddIterations = (iterations) => {
  return {
    type: ADD_ITERATIONS,
    iterations
  }
}

export const onPendingStop = (isPendingStop) => {
  return {
    type: PENDING_STOP,
    isPendingStop
  }
}

export const onWaitingLastIteration = (waitingLastIteration) => {
  return {
    type: WAITING_LAST_ITERATION,
    waitingLastIteration
  }
}

export const onInitializeNetRender = (netRender) => {
  return {
    type: INITIALIZE_NET_RENDER,
    netRender
  }
}

export const onGlobalDuration = (globalDuration) => {
  return {
    type: GLOBAL_DURATION,
    globalDuration
  }
}

export function onSaveNet(data) {
  return {
    [CALL_API]: {
      endpoint: '/api/save_net',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      types: [REQUEST_SAVE_NET, SUCCESS_SAVE_NET, FAILURE_SAVE_NET],
      body: JSON.stringify(data)
    }
  }
}

export function onGetNet() {
  return {
    [CALL_API]: {
      endpoint: '/api/get_net',
      method: 'GET',
      types: [REQUEST_GET_NET, SUCCESS_GET_NET, FAILURE_GET_NET]
    }
  }
}

export function onDeleteNet() {
  return {
    [CALL_API]: {
      endpoint: '/api/delete_net',
      method: 'DELETE',
      types: [REQUEST_DELETE_NET, SUCCESS_DELETE_NET, FAILURE_DELETE_NET]
    }
  }
}