class SpellsComponent < ApplicationRecord
  belongs_to :spell
  belongs_to :component

  validates_uniqueness_of :spell_id, :scope => :component_id
  
end
