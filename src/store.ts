import { createStore, combineReducers } from 'redux'
import { FlashReducer, FlashState } from './states/FlashState'

export type AppState = {
  flash: FlashState
}

const store = createStore(
  combineReducers<AppState>({
    flash: FlashReducer
  })
)

export default store
