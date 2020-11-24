Rails.application.routes.draw do
  get 'likes/index'
  get 'likes/create'
  get 'likes/destroy'
  scope :api do
    scope :v1 do

      resources :posts do
        resources :comments
      end
      resources :users
    end

  end
end
