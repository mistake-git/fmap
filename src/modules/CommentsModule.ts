import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CommentModel from '../models/CommentModel'
 
type State = {
  comment: CommentModel | null
}
 
const initialState: State = {
  comment: null
}
 
const commentModule = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    createComment(state: State, action: PayloadAction){

    },
    updateComment(state: State, action: PayloadAction){

    },
    destroyComment(state: State, action: PayloadAction){

    }
  }
})
 
export const {
  createComment, updateComment, destroyComment
} = commentModule.actions
 
export default commentModule