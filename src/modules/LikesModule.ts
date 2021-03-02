import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LikeModel from '../models/LikeModel'
 
type State = {
  Like: LikeModel | null
}
 
const initialState: State = {
  Like: null
}
 
const LikeModule = createSlice({
  name: 'Like',
  initialState,
  reducers: {
    createLike(state: State, action: PayloadAction){

    },
    destroyLike(state: State, action: PayloadAction){

    }
  }
})
 
export const {
  createLike, destroyLike
} = LikeModule.actions
 
export default LikeModule
