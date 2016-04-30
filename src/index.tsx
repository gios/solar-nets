// React, Redux
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Routing
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Containers
import App from './containers/App'
import Dash from './containers/Dash'
import About from './containers/About'
import Analyze from './containers/Analyze'
import Monitoring from './containers/Monitoring'

// Styles (SCSS)
import './index.scss'

// Bootstrap, jQuery, Tether
import $ from 'jquery'
import Tether from 'tether'
window.$ = window.jQuery = $
window.Tether = Tether
// require('bootstrap')

// Store
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