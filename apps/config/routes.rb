Rails.application.routes.draw do
  get 'home', to: 'home#index'
  get 'products', to: 'products#index'
  get 'products/show'
  get 'products/new'
  get 'products/edit'
  get 'products/destroy'
  get 'invoice', to: 'upload_invoices#index'
  post 'invoice', to: 'upload_invoices#create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  # root 'products#index'
end
