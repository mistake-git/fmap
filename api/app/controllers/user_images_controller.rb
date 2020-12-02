class UserImagesController < ApplicationController
  
  def update
    @user = User.find_by(uid: params[:id])
    pp "#{@user.name}:::::::::::::::::::::::::"
    if params[:image]
      @user.image.attach(params[:image])
      image = url_for(@user.image)
    elsif params[:image]
      blob = ActiveStorage::Blob.create_after_upload!(
        io: StringIO.new((Base64.decode64(params[:image].split(",")[1]))),
        filename: "user.png",
        content_type: "image/png",
      )
      @user.image.attach(blob)
      image = url_for(@user.image)
    else
      image = params[:image]
    end
    pp "#{image}"
    if @user.update(image: image)
      render json: @user
    end
  end
end
