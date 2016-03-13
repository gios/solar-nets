import React, { Component } from 'react'
import { Link } from 'react-router'
import { throttle } from '../../utils/helpers'
import { MOBILE_MAX_WIDTH, VERSION } from '../../constants'

class Sidebar extends Component {

  constructor(props) {
    super(props)
    let currentMode = (window.innerWidth < MOBILE_MAX_WIDTH) ? true : false

    this.state = {
      isToggled: currentMode,
      isMobileView: currentMode
    }
  }

  componentDidMount() {
    let sidebarEl = document.querySelector('.navbar-static')
    this.windowSizeAction(sidebarEl)

    window.addEventListener('resize', throttle(() => {
      this.windowSizeAction(sidebarEl)
    }, 200))
  }

  windowSizeAction(el) {
    if (window.innerWidth < MOBILE_MAX_WIDTH) {
      if (this.state.isMobileView) {
        return
      }

      this.setState({
        isToggled: true,
        isMobileView: true
      })
      el.classList.add('toggle')
    } else {
      this.setState({
        isToggled: false,
        isMobileView: false
      })
      el.classList.remove('toggle')
    }
  }

  toggleSidebar() {
    let sidebarEl = document.querySelector('.navbar-static')

    if (this.state.isToggled) {
      this.setState({ isToggled: false })
      sidebarEl.classList.remove('toggle')
    } else {
      this.setState({ isToggled: true })
      sidebarEl.classList.add('toggle')
    }
  }

  routeSelector(route) {
    let { currentRoute } = this.props
    return (currentRoute === route) ? 'nav-link sidebar-link active' : 'nav-link sidebar-link'
  }

  render() {
    let toggleSidebarBtn = (
      <div className='toggle-sidebar-button'>
        <i className='fa fa-bars' onClick={this.toggleSidebar.bind(this) }></i>
      </div>
    )

    let toggleSidebarBtnContent = (
      <span className='fa-stack toggle-sidebar-button-content'>
        <i className='fa fa-square fa-stack-2x'></i>
        <i className='fa fa-bars fa-stack-1x fa-inverse' onClick={this.toggleSidebar.bind(this) }></i>
      </span>
    )

    return (
      <div>
        <nav role='navigation' className='navbar navbar-dark navbar-static'>
          {(this.state.isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Solar Nets</p>
            <div className='navbar-user-info'>
              <div>
                <div>Pavlo</div>
                <div>Blazhchuk</div>
              </div>
            </div>
          </div>
          <div className='createDiscussion'>
            <a href='javascript:void(0)' type='button' className='btn btn-success btn-sm' role='button'>
              Generate
            </a>
          </div>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item'>
              <Link to='/' className={this.routeSelector('/') }>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='javascript:void(0)'>
                <i className='fa fa-fire'></i>
                <span className='sidebar-list-item'>Analyze</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='javascript:void(0)'>
                <i className='fa fa-clock-o'></i>
                <span className='sidebar-list-item'>Monitoring</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link deactivate'></a>
            </li>
            <li className='nav-item'>
              <a className='nav-link sidebar-link' href='javascript:void(0)'>
                <i className='fa fa-rss'></i>
                <span className='sidebar-list-item'>About</span>
              </a>
            </li>
          </ul>
          <div className='navbar-footer'>
            <span className='label label-success text-xs-center'>Alpha v{VERSION}</span>
            <p>&copy; 2016</p>
          </div>
        </nav>
        {(this.state.isMobileView) ? toggleSidebarBtnContent : null}
      </div>
    )
  }
}

export default Sidebar