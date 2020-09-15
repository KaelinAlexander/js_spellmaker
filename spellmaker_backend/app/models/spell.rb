class Spell < ApplicationRecord
    has_many :spells_components, dependent: :destroy
    has_many :components, through: :spells_components
    
end
