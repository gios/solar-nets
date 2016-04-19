import * as Immutable from 'immutable'
import { MOBILE_MAX_WIDTH } from '../constants'
import { TOGGLE_SIDEBAR, MOBILE_SIDEBAR } from '../actions/sidebarActions'

let currentMode = (window.innerWidth < MOBILE_MAX_WIDTH) ? true : false

const sidebarState = Immutable.Map({
  isToggled: currentMode,
  isMobileView: currentMode
})

function sidebar(state = sidebarState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.merge({
        isToggled: action.toggle
      })
    case MOBILE_SIDEBAR:
      return state.merge({
        isToggled: action.mobile,
        isMobileView: action.mobile
      })
    default:
      return state
  }
}

export default sidebar