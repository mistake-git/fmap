Rails.application.routes.draw do
  get 'posts/index'
  get 'posts/show'
  get 'posts/create'
  get 'posts/update'
  get 'posts/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
