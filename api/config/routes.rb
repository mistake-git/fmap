Rails.application.routes.draw do

  scope :api do
    scope :v1 do
      resources :posts
    end
  end

end
