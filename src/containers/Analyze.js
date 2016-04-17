import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onGetNet } from '../actions/dashActions'
import AnalyzeTable from '../components/analyze/AnalyzeTable'

class Analyze extends Component {

  render() {
    let { dispatch, dashGet } = this.props

    return (
      <div className='col-md-12'>
        <AnalyzeTable dashGet={dashGet}
                      onGetNet={() => dispatch(onGetNet())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    dashGet: state.dashGet.toJS()
  }
}

export default connect(injector)(Analyze)
