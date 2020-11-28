class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def show
    same_name_post = Post.where(name: @post.name)
    feed_data =  same_name_post.where.not(feed: "").group(:feed).sum(:number)
    time_data =  same_name_post.where.not(time: "").group("HOUR(time)").sum(:number)
    date_data =  same_name_post.where.not(date: "").group("MONTH(date)").sum(:number)
    #size_data= Post.where.not(size "").group(:size).sum(:number)
    render json: {post: @post, feed_data: feed_data, time_data: time_data, date_data: date_data}
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
