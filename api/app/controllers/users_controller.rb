class UsersController < ApplicationController

  def index
    users = User.find_by(uid: params[:uid])
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

  private

  def user_params
    params.require(:user).permit(:name, :email, :uid)
  end

end


