export const CHANGE_SEVERITY = "CHANGE_SEVERITY"
export const CHANGE_MESSAGE = "CHANGE_MESSAGE"

export const changeSeverity = (severity: undefined | 'success' | 'error' | 'info') => {
  return {
    type: CHANGE_SEVERITY,
    payload: severity,
  }
}

export const changeMessage  = (message: string) => {
  return {
    type: CHANGE_MESSAGE,
    payload: message,
  }
}

