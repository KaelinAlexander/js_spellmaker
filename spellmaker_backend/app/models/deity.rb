class Deity < ApplicationRecord
    has_many :components_deities
    has_many :components, through: :components_deities
    
end
