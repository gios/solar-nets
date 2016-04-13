export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const MOBILE_SIDEBAR = 'MOBILE_SIDEBAR'

export function onToggleSidebar(toggle) {
  return {
    type: TOGGLE_SIDEBAR,
    toggle
  }
}

export function setMobileSidebar(mobile) {
  return {
    type: MOBILE_SIDEBAR,
    mobile
  }
}