class UserImagesController < ApplicationController
  
  def update
    @user = User.find_by(uid: params[:id])
    pp "#{params[:user][:image]}:::::::::::::::::"
    if params[:user][:image]
      @user.image.attach(params[:user][:image])
      image = url_for(@user.image)
    elsif params[:user][:image]
      blob = ActiveStorage::Blob.create_after_upload!(
        io: StringIO.new((Base64.decode64(params[:user][:image].split(",")[1]))),
        filename: "user.png",
        content_type: "image/png",
      )
      @user.image.attach(blob)
      image = url_for(@user.image)
    else
      image = params[:image]
    end
    if @user.image.attach(params[:user][:image])
      render json: @user
    end
  end

end
