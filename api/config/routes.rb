Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      resources :posts do
        resources :comments
        resources :likes
      end
      resources :users do
        member { get :posts }
        member { get :likes_posts }
        member { get :data }
      end
      resources :user_images, only: [:update, :destroy]
    end
  end
end
