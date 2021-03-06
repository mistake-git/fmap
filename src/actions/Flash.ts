export const CHANGE_SEVERITY = "CHANGE_SEVERITY"
export const CHANGE_MESSAGE = "CHANGE_MESSAGE"
export const DISPLAY_FLASH = "DISPLAY_FLASH "

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

export const displayFlash  = (open: boolean) => {
  return {
    type: DISPLAY_FLASH,
    payload: open,
  }
}

