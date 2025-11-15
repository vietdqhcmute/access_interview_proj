class Keyword < ApplicationRecord
  belongs_to :csv_upload
  has_one :search_result, dependent: :destroy
  validates :term, presence: true
  STATUSES = { processing: 0, successful: 1, failed: 2 }.freeze
end
