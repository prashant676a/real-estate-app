class Property < ApplicationRecord
  belongs_to :agent
  validates :title, presence: true
end
