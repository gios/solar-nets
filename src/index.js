// React, Redux
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import App from './containers/App'
import Dash from './containers/Dash'
import About from './containers/About'

// Styles (SCSS)
import './index.scss'

// Bootstrap, jQuery, Tether
import $ from 'jquery'
import Tether from 'tether'
window.$ = window.jQuery = $
window.Tether = Tether
require('bootstrap')

// Store
import solarNets from './reducers'
const store = createStore(solarNets, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Dash}/>
        <Route path='about' component={About}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('render')
)