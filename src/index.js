import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './containers/App'
import Dash from './containers/Dash'
import About from './containers/About'
import Analyze from './containers/Analyze'
import Monitoring from './containers/Monitoring'

import './index.scss'

import $ from 'jquery'
import Tether from 'tether'

window.$ = window.jQuery = $
window.Tether = Tether
require('bootstrap')

import store from './store'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Dash}/>
        <Route path='about' component={About}/>
        <Route path='analyze' component={Analyze}/>
        <Route path='monitoring' component={Monitoring}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
)
