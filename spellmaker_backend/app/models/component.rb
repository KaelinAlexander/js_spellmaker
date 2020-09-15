class Component < ApplicationRecord
    has_many :spells_components
    has_many :spells, through: :spells_components
    has_many :synonyms
    has_many :components_deities
    has many :deities, through: :components_deities
    has_many :components_uses
    has_many :uses, through: :components_uses

end
