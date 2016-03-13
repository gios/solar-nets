import React, { Component } from 'react'
import Sidebar from './sidebar/Sidebar'

class App extends Component {

  render() {
    let currentRoute = this.props.route.path
    return (
      <div>
        <div>
          <Sidebar currentRoute={currentRoute}/>
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

export default App