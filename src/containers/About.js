import React, { Component } from 'react'
import { connect } from 'react-redux'
import AboutCard from '../components/about/AboutCard'

function injector(state) {
  return state
}

@connect(injector)
class About extends Component {

  render() {
    return (
      <div className='col-md-12'>
        <AboutCard/>
      </div>
    )
  }
}

export default About
