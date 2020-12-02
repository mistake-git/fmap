class UserImagesController < ApplicationController
  
  def update
    @user = User.find(uid: params[id])
    if params[:file]
      @user.image.attach(params[:file])
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
      image = post_params[:image]
    end
    if @user.update(image: image)
      render json: @user
    end
  end

end
