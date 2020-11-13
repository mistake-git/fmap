class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def show
    render json: post
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
    if post.update(majocategory_params)
      render json: post 
    else
      render json:  post.errors
    end
  end

  def destroy
    post.destroy
  end

  private

  def set_post
    post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status)
  end
  
end
