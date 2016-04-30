import * as React from 'react'
import moment from 'moment'
import { CHART_MAX_INTERVAL } from '../../constants.js'
import Loader from '../others/Loader'

class AnalyzeTable extends React.Component {

  componentWillMount() {
    this.props.onGetNet()
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

  renderAnalyzeTable() {
    let AnalyzeTableRender
    let { dashGet } = this.props

    if(dashGet.payload) {
      AnalyzeTableRender = dashGet.payload.map((item) => {
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
    let { dashDelete, dashGet } = this.props
    let renderedAnalytic

    if(dashGet.payload) {
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
                  hidden={(dashGet.payload && dashGet.payload.length >= 1) ? false : true}
                  onClick={this.clickDeleteNet.bind(this)}>Delete Net Data</button>
        </div>
      )
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