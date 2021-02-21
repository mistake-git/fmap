import CommentModel from './CommentModel'
import PostModel from './PostModel'
import UserModel from './UserModel'

interface NotificationModel {
  id: number
  created_at: Date
  visited: UserModel
  visitor: UserModel
  action: string
  comment: CommentModel
  post: PostModel
  checked: boolean
}

export default NotificationModel
