import CommentModel from './CommentModel'
import UserModel from './UserModel'

interface PostModel {
  id?: number
  name?: string
  size?: number
  weight?: number
  number?: number
  weather?: string
  feed?: string
  date?: Date
  time?: Date
  memo?: string
  status?: string
  latitude?: number
  longitude?: number
  image_url: string
  created_at: Date
  comments: CommentModel[]
  user: UserModel
  likes_users: UserModel[]
}

export default PostModel
