import React, { Component } from 'react'
import moment from 'moment'
import { CHART_MAX_INTERVAL } from '../../constants'
import Loader from '../others/Loader'

class AnalyzeTable extends Component {

  componentWillMount() {
    this.props.onGetNet({
      start: 0,
      end: CHART_MAX_INTERVAL
    })
  }

  componentWillUnmount() {
    let { onSetDeleteTimer, onDeleteButton } = this.props
    onDeleteButton(false)
    onSetDeleteTimer(null)
  }

  clickDeleteNet() {
    this.props.onDeleteNet().then((status) => {
      if(status.error) return
      this.props.onGetNet({
        start: 0,
        end: CHART_MAX_INTERVAL
      })
    })
  }

  mouseOverDeleteNet() {
    let { analyze, onSetDeleteTimer, onDeleteButton } = this.props
    if(!analyze.timerId) {
      let hiddenDeleteTimer = setTimeout(() => {
        onDeleteButton(true)
      }, 2000)
      onSetDeleteTimer(hiddenDeleteTimer)
    }
  }

  mouseLeaveDeleteNet() {
    let { analyze, onSetDeleteTimer } = this.props
    clearTimeout(analyze.timerId)
    onSetDeleteTimer(null)
  }

  renderAnalyzeTable() {
    let AnalyzeTableRender
    let { dashGet } = this.props

    if(dashGet.payload) {
      AnalyzeTableRender = dashGet.payload.nets.map((item) => {
        return (
          <tr key={item.id}>
            <th scope='row'>{item.id}</th>
            <td>{item.needs}</td>
            <td>{item.consumed_solar_energy}</td>
            <td>{item.consumed_electro_energy}</td>
            <td>{item.solar_energy}</td>
            <td>{item.electro_energy}</td>
            <td>{item.sold_solar_energy}</td>
            <td>{item.price}</td>
            <td>{moment(item.created_at).format('D MMM YYYY HH:mm:ss')}</td>
          </tr>
        )
      })
    }

    return AnalyzeTableRender
  }

  render() {
    let { dashDelete, dashGet, analyze } = this.props
    let renderedAnalytic

    if(dashGet.payload) {

      if(dashGet.payload.total) {
        renderedAnalytic = (
          <div>
            <table className='table'>
              <thead className='thead-inverse'>
                <tr>
                  <th>#</th>
                  <th>Needs</th>
                  <th>Consumed Solar Energy</th>
                  <th>Consumed Electro Energy</th>
                  <th>Solar Energy</th>
                  <th>Electro Energy</th>
                  <th>Sold Solar Energy</th>
                  <th>Price</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {this.renderAnalyzeTable()}
              </tbody>
            </table>
            <button type='button'
                    className='btn btn-danger m-b-1'
                    disabled={dashDelete.isFetching}
                    hidden={(dashGet.payload && dashGet.payload.nets.length >= 1 && analyze.activeDeleteButton) ? false : true}
                    onClick={this.clickDeleteNet.bind(this)}>Delete Net Data</button>
            <div className='hidden-delete m-x-1'
                 onMouseOver={this.mouseOverDeleteNet.bind(this)}
                 onMouseLeave={this.mouseLeaveDeleteNet.bind(this)}>
            </div>
          </div>
        )
      } else {
        renderedAnalytic = (
          <div className='alert alert-warning' role='alert'>
            <strong>Warning!</strong> You are need to create at least one net iteration
          </div>
        )
      }
    } else {
      renderedAnalytic = <Loader size={6}/>
    }

    return (
      <div>
        {renderedAnalytic}
      </div>
    )
  }
}

export default AnalyzeTable
