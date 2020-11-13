Rails.application.routes.draw do

  scope :api do
    scope :v1 do
      resources :posts do
        resources :comment
      end
      resources :users
    end
  end

end
