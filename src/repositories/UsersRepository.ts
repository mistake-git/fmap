import UserFormModel from '../forms/UserFormModel'
import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'
import { myHttpClient } from '../plugins/axios'

export default class UsersRepository {
  public static async createUser(user: UserFormModel): Promise<UserModel[]> {
    const result = await myHttpClient.post('/users', { user: user })
    return result.data
  }

  public static async getUsers(page: number): Promise<UserModel[]> {
    const result = await myHttpClient.get(`/users?page=${page}`)
    return result.data
  }

  public static async getUser(userUid: string| undefined): Promise<UserModel> {
    const result = await myHttpClient.get(`/users/${userUid}`)
    return result.data
  }

  public static async getUserData(userUid: string): Promise<any> {
    const result = await myHttpClient.get(`/users/${userUid}/data`)
    return result.data
  }

  public static async getUserPosts(userUid: string): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/posts`)
    return result.data
  }

  public static async getUserFeed(
    userUid: string,
    page: number
  ): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/feed?page=${page}`)
    return result.data
  }

  public static async getUserLikesPosts(userUid: string): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/likes_posts`)
    return result.data
  }

  public static async getUserFollowings(userUid: string): Promise<UserModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/followings`)
    return result.data
  }

  public static async getUserFollowers(userUid: string): Promise<UserModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/followers`)
    return result.data
  }

  public static async updateUser(
    userUid: string,
    user: UserFormModel
  ): Promise<UserModel> {
    const result = await myHttpClient.patch(`/users/${userUid}`, { user: user })
    return result.data
  }

  public static async updateProfileImage(
    userUid: string,
    formData: any
  ): Promise<UserModel> {
    const result = await myHttpClient.patch(
      `/user_images/${userUid}`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    )
    return result.data
  }

  public static async destroyProfileImage(userUid: string): Promise<UserModel> {
    const result = await myHttpClient.delete(`/user_images/${userUid}`)
    return result.data
  }

  public static async search(search: string): Promise<UserModel[]> {
    const result = await myHttpClient.get(`/users/search?search=${search}`)
    return result.data
  }
}
