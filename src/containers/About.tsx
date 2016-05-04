import * as React from 'react'
import { connect } from 'react-redux'
import AboutCard from '../components/about/AboutCard'

class About extends React.Component {

  render() {
    return (
      <div className='col-md-12'>
        <AboutCard/>
      </div>
    )
  }
}

function injector(state) {
  return state
}

export default connect(injector)(About)