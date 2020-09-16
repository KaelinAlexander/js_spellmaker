class ComponentsUse < ApplicationRecord
  belongs_to :component
  belongs_to :use

  validates_uniqueness_of :component_id, :scope => :use_id
  
end
