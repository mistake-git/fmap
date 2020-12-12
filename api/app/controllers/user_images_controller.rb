class UserImagesController < ApplicationController
  before_action :set_user
  
  def update
    if params[:image]
      @user.image.purge
      @user.image.attach(params[:image])
    end
    render json: @user
  end

  def destroy
    if @user.image.attached?
      @user.image.purge
    end
    render json: @user
  end

  private

  def user_params
    params.permit(:uid, :image)
  end

  def set_user
    @user = User.find_by(uid: params[:id])
  end

end
