export const SIMULATION_START = 'SIMULATION_START'
export const SIMULATION_STOP = 'SIMULATION_STOP'
export const ADD_ITERATIONS = 'ADD_ITERATIONS'
export const PENDING_STOP = 'PENDING_STOP'
export const WAITING_LAST_ITERATION = 'WAITING_LAST_ITERATION'
export const INITIALIZE_NET_RENDER = 'INITIALIZE_NET_RENDER'

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

export const onInitializeNetRender = () => {
  return {
    type: INITIALIZE_NET_RENDER,
    netRender: true
  }
}