class CommentsController < ApplicationController
  before_action :set_post, only: [:create, :destroy]
  
  def create
    comment = Comment.new(
      comment_params.merge(post_id: @post.id)
    )
    if comment.save
    else
      render json: comment.errors
    end
  end

  def update
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

end