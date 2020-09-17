class Component < ApplicationRecord
    has_many :spells_components, dependent: :destroy
    has_many :spells, through: :spells_components

    has_many :synonyms, dependent: :destroy
    
    has_many :components_deities, dependent: :destroy
    has_many :deities, through: :components_deities
    
    has_many :components_uses, dependent: :destroy
    has_many :uses, through: :components_uses

    accepts_nested_attributes_for :deities
    accepts_nested_attributes_for :uses
    accepts_nested_attributes_for :synonyms
    accepts_nested_attributes_for :components_deities
    accepts_nested_attributes_for :components_uses

end
