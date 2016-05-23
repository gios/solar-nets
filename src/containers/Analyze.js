import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onGetNet, onDeleteNet } from '../actions/dashActions'
import { onSetDeleteTimer, onDeleteButton } from '../actions/analyzeActions'
import AnalyzeTable from '../components/analyze/AnalyzeTable'

function injector(state) {
  return {
    dashGet: state.dashGet.toJS(),
    dashDelete: state.dashDelete.toJS(),
    analyze: state.analyze.toJS()
  }
}

@connect(injector)
class Analyze extends Component {

  render() {
    let { dispatch, dashGet, dashDelete, analyze } = this.props

    return (
      <div className='col-md-12'>
        <AnalyzeTable dashGet={dashGet}
                      dashDelete={dashDelete}
                      analyze={analyze}
                      onSetDeleteTimer={timerId => dispatch(onSetDeleteTimer(timerId))}
                      onDeleteButton={active => dispatch(onDeleteButton(active))}
                      onDeleteNet={() => dispatch(onDeleteNet())}
                      onGetNet={options => dispatch(onGetNet(options))}/>
      </div>
    )
  }
}

export default Analyze
