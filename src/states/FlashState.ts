import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { updateOpen, updateMessage, updateSeverity } from '../actions/FlashActions'
import FlashMessageModel from '../models/FlashMessageModel'

export type FlashState = FlashMessageModel

export const initialState: FlashMessageModel = {
  message: '',
  severity: undefined,
  isOpen: false,
}

export const FlashReducer = reducerWithInitialState(initialState)
  .case(updateSeverity, (state, payload) => {
    return { ...state, severity: payload }
  })
  .case(updateMessage, (state, payload) => {
    return { ...state, message: payload }
  })
  .case(updateOpen, (state, payload) => {
    return { ...state, isOpen: payload }
  })
