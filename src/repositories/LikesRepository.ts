import LikeModel from '../models/LikeModel'
import { myHttpClient } from '../plugins/axios'

export default class LikessRepository {
  public static async createLike(
    postId: number,
    userId: number
  ): Promise<LikeModel> {
    const result = await myHttpClient.post(`/posts/${postId}/likes`, {
      like: { user_id: userId },
    })
    return result.data
  }

  public static async destroyLike(postId: number, likeId: number) {
    await myHttpClient.delete(`/posts/${postId}/likes/${likeId}`)
  }
}
