class LikesController < ApplicationController
  before_action :set_post,  except: :destroy
  before_action :set_like, except: :index

  def index
    likes = @post.likes
    render json: likes
  end

  def create
    like = Like.new(user_id: current_user.id, post_id: @post.id)
    like.save
    render json: like
  end

  def destroy
    @like.destroy
  end

  private
  
  def set_like
    @like = Like.find_by(user_id: current_user.id, post_id: params[:post_id])
  end
  
  def set_post
    @post = Post.find(params[:post_id])
  end
  
  def like_params
    params.require(:like).permit(:user_id, :post_id)
  end

end
