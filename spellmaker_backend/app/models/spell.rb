class Spell < ApplicationRecord
    has_many :spells_components, dependent: :destroy
    has_many :components, through: :spells_components

    validates :name, presence: true
    validates :process, presence: true
    validates :intention, presence: true

    accepts_nested_attributes_for :spells_components
    
end
