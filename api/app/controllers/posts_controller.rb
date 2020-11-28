class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def show
    same_name_post = Post.where(name: @post.name)
    size_data = same_name_post.where.not(size: nil).group(:size).sum(:number)
    feed_data = same_name_post.where.not(feed: '').group(:feed).sum(:number)
    date_data = same_name_post.where.not(date: nil).group("MONTH(date)").sum(:number)
    time_data = same_name_post.where.not(time: nil).group("HOUR(time)").sum(:number)
    user = @post.user
    render json: {post: @post, user: user, feed_data: feed_data, time_data: time_data, date_data: date_data, size_data: size_data}
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def destroy
    @post.destroy
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:user_id, :image, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status)
  end
  
end
