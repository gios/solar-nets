import React, { Component } from 'react'
import { Link } from 'react-router'
import { NotificationManager } from 'react-notifications';
import { throttle } from '../../utils/helpers'
import { MOBILE_MAX_WIDTH, VERSION } from '../../constants'

class Sidebar extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let sidebarEl = document.querySelector('.navbar-static')
    this.windowSizeAction(sidebarEl)

    window.addEventListener('resize', throttle(() => {
      this.windowSizeAction(sidebarEl)
    }, 200))
  }

  windowSizeAction(el) {
    let { onToggleSidebar, onMobileSidebar } = this.props

    if (window.innerWidth < MOBILE_MAX_WIDTH) {
      onToggleSidebar(true)
      onMobileSidebar(true)
      el.classList.add('toggle')
    } else {
      onToggleSidebar(false)
      onMobileSidebar(false)
      el.classList.remove('toggle')
    }
  }

  toggleSidebar() {
    let { onToggleSidebar, isToggled } = this.props
    let sidebarEl = document.querySelector('.navbar-static')

    if (isToggled) {
      onToggleSidebar(false)
      sidebarEl.classList.remove('toggle')
    } else {
      onToggleSidebar(true)
      sidebarEl.classList.add('toggle')
    }
  }

  routeSelector(route) {
    let { currentRoute } = this.props
    return (currentRoute === route) ? 'nav-link sidebar-link active' : 'nav-link sidebar-link'
  }

  triggerRoute(e) {
    let { simulation, isMobileView } = this.props
    isMobileView && this.toggleSidebar()

    if(simulation) {
      e.preventDefault()
      NotificationManager.info('To continue you are need to stop current simulation', 'Stop Current Simulation', 10000)
    }
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

    let { isMobileView } = this.props

    return (
      <div>
        <nav role='navigation' className='navbar navbar-dark navbar-static'>
          {(isMobileView) ? toggleSidebarBtn : null}
          <div className='navbar-info'>
            <p className='navbar-logo'>Solar Nets</p>
          </div>
          <div className='project-description'>
            Monitoring solar power via Petri Nets
          </div>
          <ul className='nav sidebar-list-static'>
            <li className='nav-item'>
              <Link to='/' className={this.routeSelector('/')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-dashcube'></i>
                <span className='sidebar-list-item'>Dash</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/analyze' className={this.routeSelector('/analyze')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-fire'></i>
                <span className='sidebar-list-item'>Analyze</span>
              </Link>
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
              <Link to='/about' className={this.routeSelector('/about')} onClick={this.triggerRoute.bind(this)}>
                <i className='fa fa-rss'></i>
                <span className='sidebar-list-item'>About</span>
              </Link>
            </li>
          </ul>
          <div className='navbar-footer'>
            <span className='label label-success text-xs-center'>{VERSION}</span>
            <p>Pavlo Blazhchuk &copy; 2016</p>
          </div>
        </nav>
        {(isMobileView) ? toggleSidebarBtnContent : null}
      </div>
    )
  }
}

export default Sidebar