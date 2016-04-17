import { combineReducers } from 'redux'
import { dash, dashSave, dashGet, dashDelete } from './dashReducer'
import sidebar from './sidebarReducer'

const solarNets = combineReducers({
  dash,
  dashSave,
  dashGet,
  dashDelete,
  sidebar
})

export default solarNets