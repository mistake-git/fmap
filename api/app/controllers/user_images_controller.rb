class UserImagesController < ApplicationController
  
  def update
    @user = User.find_by(uid: params[:id])
    @user.update(image: params[:user][:image])
    render json: @user
  end

end
