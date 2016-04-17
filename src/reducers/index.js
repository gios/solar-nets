import { combineReducers } from 'redux'
import { dash, dashSave } from './dashReducer'
import sidebar from './sidebarReducer'

const solarNets = combineReducers({
  dash,
  dashSave,
  sidebar
})

export default solarNets