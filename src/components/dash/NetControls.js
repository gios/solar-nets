import React, { Component } from 'react'

class NetControls extends Component {
  render() {
    let { simulation, waitingLastIteration } = this.props
    return (
      <div>
        <button onClick={() => this.props.startTransitionOnce(this.refs.stopSimulation)}
                type='button'
                className='btn btn-primary m-x-1'
                disabled={simulation}>Start Simulation</button>
        <button onClick={() => this.props.startInfinityTransition(this.refs.stopSimulation)}
                type='button'
                className='btn btn-primary m-x-1'
                disabled={simulation}>Start Infinity Simulation</button>
        <button onClick={() => this.props.stopTransition(this.refs.stopSimulation)}
                type='button'
                ref='stopSimulation'
                className='btn btn-danger m-x-1'
                disabled={!simulation || waitingLastIteration}>Stop Simulation</button>
      </div>
    )
  }
}

export default NetControls
