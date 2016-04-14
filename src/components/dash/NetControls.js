import React, { Component } from 'react'

class NetControls extends Component {
  render() {
    let { simulation, waitingLastIteration } = this.props
    return (
      <div className='card-group'>
        <div className='card'>
          <h4 className='card-title m-t-1'>Simulation Controls</h4>
          <button onClick={() => this.props.startTransitionOnce(this.refs.stopSimulation)}
                  type='button'
                  className='btn btn-primary m-a-1'
                  disabled={simulation}>Start Simulation</button>
          <button onClick={() => this.props.startInfinityTransition(this.refs.stopSimulation)}
                  type='button'
                  className='btn btn-primary m-a-1'
                  disabled={simulation}>Start Infinity Simulation</button>
          <button onClick={() => this.props.stopTransition(this.refs.stopSimulation)}
                  type='button'
                  ref='stopSimulation'
                  className='btn btn-danger m-a-1'
                  disabled={!simulation || waitingLastIteration}>Stop Simulation</button>
        </div>
        <div className='card'>
          <h4 className='card-title m-t-1'>Predefined Data</h4>
          <form className='m-x-1'>
            <fieldset className='form-group'>
              <label for='InputNeeds'>Needs</label>
              <input type='text' className='form-control' id='InputNeeds' placeholder='Enter needs'/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 5000.</small>
            </fieldset>
            <fieldset className='form-group'>
              <label for='InputSolarStation'>Solar Station Power</label>
              <input type='text' className='form-control' id='InputSolarStation' placeholder='Enter solar station power'/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 5000.</small>
            </fieldset>
            <fieldset className='form-group'>
              <label for='InputElectroStation'>Electro Station Power</label>
              <input type='text' className='form-control' id='InputElectroStation' placeholder='Enter electro station power'/>
              <small className='text-muted'>Enter numeric value in diapason from 1 to 5000.</small>
            </fieldset>
          </form>
        </div>
        <div className='card'>
          <h4 className='card-title m-t-1'>Other Settings</h4>
        </div>
      </div>
    )
  }
}

export default NetControls
