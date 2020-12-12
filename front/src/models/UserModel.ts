import PostModel from './PostModel'

interface UserModel {
  id?: number
  name?: string
  uid?: string
  email?: string
  introduction?: string
  password?: string
  password_confirmation?: string
  posts?: PostModel[]
  likes_posts?: PostModel[]
}

export default UserModel
