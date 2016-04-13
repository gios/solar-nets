export const SIMULATION_START = 'SIMULATION_START'
export const SIMULATION_STOP = 'SIMULATION_STOP'
export const ADD_ITERATIONS = 'ADD_ITERATIONS'

export const simulationStart = () => {
  return {
    type: SIMULATION_START,
    simulation: true
  }
}

export const simulationStop = () => {
  return {
    type: SIMULATION_STOP,
    simulation: false
  }
}

export const addIterations = (iterations) => {
  return {
    type: ADD_ITERATIONS,
    iterations
  }
}