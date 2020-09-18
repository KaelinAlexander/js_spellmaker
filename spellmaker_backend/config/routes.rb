Rails.application.routes.draw do
  resources :components
  resources :spells
  resources :uses
  resources :deities
  resources :synonyms
  
  resources :spells_components

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "spellscomponents", controller: 'spells_components', action: :index

  post "spells_components/deletion", to: "spells_components#deletion"

end
