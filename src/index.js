// React, Redux
import React from 'react'
import { render } from 'react-dom'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Components
import App from './components/App'
import Dash from './components/dash/Dash'
import About from './components/about/About'

// Styles (SCSS)
import './index.scss'

// Bootstrap, jQuery, Tether
import $ from 'jquery'
import Tether from 'tether'
window.$ = window.jQuery = $
window.Tether = Tether
require('bootstrap')

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Dash}/>
      <Route path='about' component={About}/>
    </Route>
  </Router>,
  document.getElementById('render')
)