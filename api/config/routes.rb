Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      resources :posts do
        resources :comments
        resources :likes
      end
      resources :users
      resources :user_images, only: [:update, :destroy]
    end
  end
end
