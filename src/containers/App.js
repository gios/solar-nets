import { connect } from 'react-redux'
import React, { Component } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { onToggleSidebar, setMobileSidebar } from '../actions/sidebarActions'

class App extends Component {

  render() {
    let { dispatch, simulation, currentRoute, isToggled, isMobileView } = this.props
    return (
      <div>
        <div>
          <Sidebar currentRoute={currentRoute}
                   simulation={simulation}
                   isToggled={isToggled}
                   isMobileView={isMobileView}
                   onToggleSidebar={(value) => dispatch(onToggleSidebar(value))}
                   onIsMobileView={(value) => dispatch(setMobileSidebar(value))}/>
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
    simulation: state.dash.get('simulation'),
    currentRoute: ownProps.location.pathname,
    isToggled: state.sidebar.get('isToggled'),
    isMobileView: state.sidebar.get('isMobileView')
  }
}

export default connect(injector)(App)