import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FlashMessageModel from '../models/FlashMessageModel'

type State = {
  flashMessage: FlashMessageModel | null
}

const initialState: State = {
  flashMessage: null,
}

const flashMessageModule = createSlice({
  name: 'flashMessage',
  initialState,
  reducers: {
    createFlashMessage(state: State, action: PayloadAction) {},
  },
})

export const { createFlashMessage } = flashMessageModule.actions

export default flashMessageModule
