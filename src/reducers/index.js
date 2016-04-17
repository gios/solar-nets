import { combineReducers } from 'redux'
import { dash, dashSave, dashGet } from './dashReducer'
import sidebar from './sidebarReducer'

const solarNets = combineReducers({
  dash,
  dashSave,
  dashGet,
  sidebar
})

export default solarNets