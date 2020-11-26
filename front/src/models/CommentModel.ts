import PostModel from './PostModel'
import UserModel from './UserModel'

interface CommentModel {
  id?: number
  post_id?: number
  user_id: number
  content: string
  user: UserModel
  posts: PostModel[]
}

export default CommentModel
