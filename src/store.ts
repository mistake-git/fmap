import { createStore, combineReducers } from 'redux'
import { FlashReducer, State } from './states/FlashState'

export type AppState = {
  flash: State
}

const store = createStore(
  combineReducers<AppState>({
    flash: FlashReducer
  })
)

export default store
