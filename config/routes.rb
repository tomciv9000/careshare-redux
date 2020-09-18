Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :notes
  resources :sleeps
  resources :foods
  resources :diapers
  resources :children
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
