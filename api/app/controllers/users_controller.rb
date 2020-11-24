class UsersController < ApplicationController

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

  def show
    user = User.find_by(uid: params[:id])
    #user_data = user.posts.group(:name).sum(:number)
   render json: user
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :uid)
  end

end


