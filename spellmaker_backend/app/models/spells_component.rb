class SpellsComponent < ApplicationRecord
  belongs_to :spell
  belongs_to :component
  
end
