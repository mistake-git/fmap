import actionCreatorFactory from 'typescript-fsa'

export const UPDATE_SEVERITY = 'UPDATE_SEVERITY'
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const UPDATE_OPEN = 'UPDATE_OPEN'

const actionCreator = actionCreatorFactory()

export const updateSeverity = actionCreator<
  undefined | 'success' | 'error' | 'info'
>('UPDATE_SEVERITY')
export const updateMessage = actionCreator<string>('UPDATE_MESSAGE')
export const updateOpen = actionCreator<boolean>('UPDATE_OPEN')
