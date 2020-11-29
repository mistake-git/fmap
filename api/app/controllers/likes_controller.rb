class LikesController < ApplicationController
  before_action :set_post
  before_action :set_like, except: [:index, :create]

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    like = Like.new(like_params)
    like.save
    likes_users = @post.likes_users
    render json: {like: like, likes_users: likes_users}
  end

  def destroy
    @like.destroy
    likes_users = @post.likes_users
    render json: {likes_users: likes_users}
  end

  private
  
  def set_like
    @like = Like.find(params[:id])
  end
  
  def set_post
    @post = Post.find(params[:post_id])
  end
  
  def like_params
    params.require(:like).permit(:user_id, :post_id)
  end

end
