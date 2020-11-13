Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      resources :posts
      resources :users
    end
  end

end
