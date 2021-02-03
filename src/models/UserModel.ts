import PostModel from './PostModel'

interface UserModel {
  id: number
  name: string
  uid: string
  email: string
  image_url: string
  introduction?: string
  password: string
  password_confirmation: string
  address?: string
  latitude?: number
  longitude?: number
  posts: PostModel[]
  likes_posts: PostModel[]
  followings: UserModel[]
  followers: UserModel[]
}

export default UserModel
