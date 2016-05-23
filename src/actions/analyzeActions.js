export const ANALYZE_DELETE_TIMER = 'ANALYZE_DELETE_TIMER'
export const ANALYZE_DELETE_BUTTON = 'ANALYZE_DELETE_BUTTON'

export function onSetDeleteTimer(timerId) {
  return {
    type: ANALYZE_DELETE_TIMER,
    timerId
  }
}

export function onDeleteButton(activeDeleteButton) {
  return {
    type: ANALYZE_DELETE_BUTTON,
    activeDeleteButton
  }
}