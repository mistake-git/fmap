interface CommentModel {
  id?: number
  post_id?: number
  user_id: number
  content: string
}

export default CommentModel
