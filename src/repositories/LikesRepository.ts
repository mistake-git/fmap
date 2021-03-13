import LikeModel from '../models/LikeModel'
import { myHttpClient } from '../plugins/axios'

export default class LikessRepository {
  public static async createLike(postId: number): Promise<LikeModel> {
    const result = await myHttpClient.post(`/posts/${postId}/likes`)
    return result.data
  }

  public static async destroyLike(postId: number, likeId: number) {
    await myHttpClient.delete(`/posts/${postId}/likes/${likeId}`)
  }

  public static async getMyLike(postId: number): Promise<LikeModel> {
    const result = await myHttpClient.get(`/posts/${postId}/likes/my_like`)
    return result.data
  }
}
