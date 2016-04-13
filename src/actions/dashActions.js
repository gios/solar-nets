export const simulationStart = () => {
  return {
    type: 'SIMULATION_START',
    simulation: true
  }
}

export const simulationStop = () => {
  return {
    type: 'SIMULATION_STOP',
    simulation: false
  }
}