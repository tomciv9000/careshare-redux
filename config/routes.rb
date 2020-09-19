Rails.application.routes.draw do
  resources :shifts
  namespace :api do
    scope :v1 do
      resources :food
      resources :children
      resources :shifts
      resources :diapers
      resources :notes
      resources :sleep

      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
