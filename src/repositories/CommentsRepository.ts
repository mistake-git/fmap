import CommentFormModel from '../forms/CommentFormModel'
import CommentModel from '../models/CommentModel'
import { myHttpClient } from '../plugins/axios'

export default class CommentsRepository {
  public static async createComment(
    postId: number,
    comment: CommentFormModel
  ): Promise<CommentModel> {
    const result = await myHttpClient.post(`/posts/${postId}/comments`, {
      comment: comment,
    })
    return result.data
  }

  public static async updateComment(
    postId: number,
    commentId: number,
    comment: CommentFormModel
  ): Promise<CommentModel> {
    const result = await myHttpClient.patch(
      `/posts/${postId}/comments/${commentId}`,
      { comment: comment }
    )
    return result.data
  }

  public static async destroyComment(postId: number, commentId: number) {
    await myHttpClient.delete(`/posts/${postId}/comments/${commentId}`)
  }
}
