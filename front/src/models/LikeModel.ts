import PostModel from './PostModel'
import UserModel from './UserModel'

interface LikeModel {
  id?: number
  post_id: number
  user_id: number
  user: UserModel
  posts: PostModel[]
}

export default LikeModel
