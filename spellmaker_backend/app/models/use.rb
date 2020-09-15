class Use < ApplicationRecord
    has_many :components_uses
    has_many :uses, through: :components_uses
    
end
