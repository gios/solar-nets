import { connect } from 'react-redux'
import React, { Component } from 'react'
import Sidebar from '../components/sidebar/Sidebar'

class App extends Component {

  render() {
    let { simulation, currentRoute } = this.props
    return (
      <div>
        <div>
          <Sidebar currentRoute={currentRoute} simulation={simulation}/>
          <div className='content-wrapper'>
            <div className='container-fluid'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function injector(state, ownProps) {
  return {
    simulation: state.dashReducer.get('simulation'),
    currentRoute: ownProps.location.pathname
  }
}

export default connect(injector)(App)