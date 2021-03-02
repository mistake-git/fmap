// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'

// const store = configureStore({
//   reducer: rootReducer
// })

// export type AppDispatch = typeof store.dispatch

// export default store

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
