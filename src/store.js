import { createStore, compose } from 'redux'

// Store
import solarNets from './reducers'
const store = createStore(solarNets, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store