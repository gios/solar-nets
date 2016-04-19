import * as React from 'react'
import moment from 'moment'

class AnalyzeTable extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.onGetNet()
  }

  clickDeleteNet() {
    this.props.onDeleteNet().then((status) => {
      if(status.error) return
      this.props.onGetNet()
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
    return (
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
                disabled={this.props.dashDelete.isFetching}
                hidden={(this.props.dashGet.payload && this.props.dashGet.payload.length < 1) ? true : false}
                onClick={this.clickDeleteNet.bind(this)}>Delete Net Data</button>
      </div>
    )
  }
}

export default AnalyzeTable