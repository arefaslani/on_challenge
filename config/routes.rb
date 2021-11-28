Rails.application.routes.draw do
  resources :dealers, only: %i(index)
end
