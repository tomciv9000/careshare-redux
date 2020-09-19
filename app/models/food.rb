class Food < ApplicationRecord
    belongs_to :child
    belongs_to :shift
end
