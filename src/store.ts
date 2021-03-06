import { createStore, combineReducers } from 'redux'
import { SignInReducer, State } from './states/SignInState'

export type AppState = {
  signIn: State
}

const store = createStore(
  combineReducers<AppState>({
    signIn: SignInReducer,
  })
)

export default store
