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

  public static async getUser(userUid: string): Promise<UserModel> {
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

  public static async getUserLikesPosts(userUid: string): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/users/${userUid}/likes_posts`)
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

  public static async createRelationships(user_id: number, follow_id: number): Promise<UserModel> {
    const result = await myHttpClient.post('/relationships', { user_id: user_id, follow_id: follow_id  })
    return result.data
  }

  public static async destroyRelationships(user_id: number, follow_id: number){
    const result = await myHttpClient.delete('/relationships', { params: {user_id: user_id, follow_id: follow_id} })
  }
}
