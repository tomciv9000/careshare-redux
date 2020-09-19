class Shift < ApplicationRecord
    belongs_to :user
    has_many :children
    has_many :diapers
    has_many :foods
    has_many :notes
    has_many :sleeps
end
