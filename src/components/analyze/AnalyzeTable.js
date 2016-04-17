import React, { Component } from 'react'
import moment from 'moment'
import Loader from '../others/Loader'

class AnalyzeTable extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.onGetNet()
  }

  renderAnalyzeTable() {
    let AnalyzeTableRender
    let { dashGet } = this.props

    if(dashGet.payload) {
      AnalyzeTableRender = dashGet.payload.map((item) => {
        return (
          <tr key={item.id}>
            <th scope='row'>{item.id}</th>
            <td>{item.consumed_electro_energy}</td>
            <td>{item.consumed_solar_energy}</td>
            <td>{item.electro_energy}</td>
            <td>{item.needs}</td>
            <td>{item.price}</td>
            <td>{item.solar_energy}</td>
            <td>{item.sold_solar_energy}</td>
            <td>{moment(item.created_at).format('D MMM YYYY HH:mm:ss')}</td>
          </tr>
        )
      })
    }

    return AnalyzeTableRender
  }

  render() {
    return (
      <div>
        {this.props.dashGet.isFetching && <Loader size={4}/>}
        <table className='table'>
          <thead className='thead-inverse'>
            <tr>
              <th>#</th>
              <th>Consumed Electro Energy</th>
              <th>Consumed Solar Energy</th>
              <th>Electro Energy</th>
              <th>Needs</th>
              <th>Price</th>
              <th>Solar Energy</th>
              <th>Sold Solar Energy</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {this.renderAnalyzeTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AnalyzeTable