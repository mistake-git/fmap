class PostsController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :set_post, only: [:show, :data, :likes, :likes_users, :update, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def show
    user = @post.user
    render json: post: @post, 
  end

  def date
    same_name_post = Post.where(name: @post.name)
    size_data = same_name_post.where.not(size: nil).group(:size).sum(:number)
    feed_data = same_name_post.where.not(feed: '').group(:feed).sum(:number)
    date_data = same_name_post.where.not(date: nil).group("MONTH(date)").sum(:number)
    time_data = same_name_post.where.not(time: nil).group("HOUR(time)").sum(:number)
    render json: 
    {
      feed_data: feed_data, 
      time_data: time_data, 
      date_data: date_data, 
      size_data: size_data, 
    }
  end

  def likes
    likes = @post.likes
    render json: likes
  end

  def likes_users
    likes_users = @post.likes_users
    render json: likes_users
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
    params.require(:post).permit(:user_id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status, :latitude, :longitude, :image)
  end
  
end
