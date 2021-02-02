import CommentModel from '../models/CommentModel'
import LikeModel from '../models/LikeModel'
import LocationModel from '../models/LocationModel'
import PostModel from '../models/PostModel'
import UserModel from '../models/UserModel'
import { myHttpClient } from '../plugins/axios'

export default class PostsRepository {
  public static async getMapPosts(): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/posts/map`)
    return result.data
  }

  public static async getRankingPosts(postId: number): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/posts/${postId}/ranking`)
    return result.data
  }

  public static async getPosts(page: number): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/posts?page=${page}`)
    return result.data
  }

  public static async getPost(postId: number): Promise<PostModel> {
    const result = await myHttpClient.get(`/posts/${postId}`)
    return result.data
  }

  public static async getPostLikes(postId: number): Promise<LikeModel[]> {
    const result = await myHttpClient.get(`/posts/${postId}/likes`)
    return result.data
  }

  public static async getPostComments(postId: number): Promise<CommentModel[]> {
    const result = await myHttpClient.get(`/posts/${postId}/comments`)
    return result.data
  }

  public static async getPostLikesUsers(postId: number): Promise<UserModel[]> {
    const result = await myHttpClient.get(`/posts/${postId}/likes_users`)
    return result.data
  }

  public static async getPostData(postId: number): Promise<any> {
    const result = await myHttpClient.get(`/posts/${postId}/data`)
    return result.data
  }

  public static async createPost(formData: any): Promise<UserModel> {
    const result = await myHttpClient.post('/posts', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    return result.data
  }

  public static async updatePost(
    postId: number,
    formData: any
  ): Promise<UserModel> {
    const result = await myHttpClient.patch(`/posts/${postId}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    return result.data
  }

  public static async destroyPost(postId: number) {
    await myHttpClient.delete(`/posts/${postId}`)
  }

  public static async search(search: string): Promise<PostModel[]> {
    const result = await myHttpClient.get(`/posts/search?search=${search}`)
    return result.data
  }

  public static async getLatLng(address: string): Promise<LocationModel> {
    const result = await myHttpClient.get(
      `/posts/get_lat_lng?address=${address}`
    )
    return result.data
  }
}
