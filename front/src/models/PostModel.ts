import CommentModel from './CommentModel'
import UserModel from './UserModel'

interface PostModel {
  id?: number
  name: string
  size?: number
  weight?: number
  number?: number
  feed?: string
  memo?: string
  status?: string
  latitude?:number
  longitude?:number
  
  comments: CommentModel[]
  user: UserModel
}

export default PostModel
