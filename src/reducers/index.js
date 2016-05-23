import { combineReducers } from 'redux'
import { dash, dashSave, dashGet, dashDelete } from './dashReducer'
import sidebar from './sidebarReducer'
import monitoring from './monitoringReducer'
import analyze from './analyzeReducer'

const solarNets = combineReducers({
  dash,
  dashSave,
  dashGet,
  dashDelete,
  monitoring,
  sidebar,
  analyze
})

export default solarNets