class Component < ApplicationRecord
    has_many :spells_components
    has_many :spells, through: :spells_components

end
