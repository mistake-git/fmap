import { createStore, combineReducers } from 'redux'
import { FlashMessageReducer, State } from './states/FlashMessageState'

export type AppState = {
  flashMessage: State
}

const store = createStore(
  combineReducers<AppState>({
    flashMessage: FlashMessageReducer,
  })
)

export default store
