require 'test_helper'

class UserImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get user_images_create_url
    assert_response :success
  end

  test "should get update" do
    get user_images_update_url
    assert_response :success
  end

end
