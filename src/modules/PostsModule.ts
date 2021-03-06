import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import PostModel from '../models/PostModel'

type State = {
  post: PostModel | null
}

const initialState: State = {
  post: null,
}

const postModule = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost(state: State, action: PayloadAction) {},
    createPost(state: State, action: PayloadAction) {},
    updatePost(state: State, action: PayloadAction) {},
    destroyPost(state: State, action: PayloadAction) {},
  },
})

export const {
  getPost,
  createPost,
  updatePost,
  destroyPost,
} = postModule.actions

export default postModule
