class UsersController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :set_user, only: [:show, :update, :posts, :likes_posts, :data]

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors
    end
  end

  def show
    user_data = @user.posts.group(:name).sum(:number)
    render json: @user
  end

  def posts
    posts = @user.posts.order(created_at: :desc)
    render json: posts
  end

  def likes_posts
    likes_posts = @user.likes_posts.order(created_at: :desc)
    render json: likes_posts
  end

  def data
    user_data = @user.posts.group(:name).sum(:number)
    render json: user_data
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :uid, :introduction)
  end

  def set_user
    @user = User.find_by(uid: params[:id])
  end

end


