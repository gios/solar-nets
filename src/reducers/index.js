import { combineReducers } from 'redux'
import dash from './dashReducer'
import sidebar from './sidebarReducer'

const solarNets = combineReducers({
  dash,
  sidebar
})

export default solarNets