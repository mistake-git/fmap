class CommentsController < ApplicationController
  before_action :set_post, only: [:index, :create, :destroy]
  before_action :set_comment, only: [:update, :destroy]

  def index 
    comments =  @post.comments.order(created_at: :desc)
    render json: comments
  end

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
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.error
    end
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
