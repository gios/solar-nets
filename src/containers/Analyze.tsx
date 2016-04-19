import * as React from 'react'
import { connect } from 'react-redux'
import { onGetNet, onDeleteNet } from '../actions/dashActions'
import AnalyzeTable from '../components/analyze/AnalyzeTable'

class Analyze extends React.Component {

  render() {
    let { dispatch, dashGet, dashDelete } = this.props

    return (
      <div className='col-md-12'>
        <AnalyzeTable dashGet={dashGet}
                      dashDelete={dashDelete}
                      onDeleteNet={() => dispatch(onDeleteNet())}
                      onGetNet={() => dispatch(onGetNet())}/>
      </div>
    )
  }
}

function injector(state) {
  return {
    dashGet: state.dashGet.toJS(),
    dashDelete: state.dashDelete.toJS()
  }
}

export default connect(injector)(Analyze)
