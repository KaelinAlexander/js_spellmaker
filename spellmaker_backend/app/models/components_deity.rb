class ComponentsDeity < ApplicationRecord
  belongs_to :component
  belongs_to :deity

  validates_uniqueness_of :component_id, :scope => :deity_id
  
end
