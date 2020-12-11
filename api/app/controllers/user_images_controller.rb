class UserImagesController < ApplicationController
  before_action :set_user
  
  def update
    @user = User.find_by(uid: params[:id])
    @user.update(user_params)
    render json: @user
  end
  

  private

  def user_params
    params.permit(:name, :email, :uid, :introduction, :image)
  end

  def set_user
    @user = User.find_by(uid: params[:id])
  end

end
