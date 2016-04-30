import { combineReducers } from 'redux'
import { dash, dashSave, dashGet, dashDelete } from './dashReducer'
import sidebar from './sidebarReducer'
import monitoring from './monitoringReducer'

const solarNets = combineReducers({
  dash,
  dashSave,
  dashGet,
  dashDelete,
  monitoring,
  sidebar
})

export default solarNets