class Spell < ApplicationRecord
    has_many :spells_components
    has_many :components, through: :spells_components
    
end
