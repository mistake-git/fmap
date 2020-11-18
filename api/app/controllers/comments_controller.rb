class CommentsController < ApplicationController
  before_action :set_post, only: [:index, :create, :destroy]
  before_action :set_comment, only: [:destroy]


  def create
    comment = Comment.new(
      comment_params.merge(post_id: @post.id)
    )
    if comment.save
      render json: comment
    else
      render json: comment.errors
    end
  end

  def update
  end

  def destroy
    @comment.destroy
  end


  private

  def comment_params
    params.require(:comment).permit(:content, :user_id)
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

end
