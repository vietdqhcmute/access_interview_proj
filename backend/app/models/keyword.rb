class Keyword < ApplicationRecord
  belongs_to :csv_upload
  has_many :search_results, dependent: :destroy

  STATUSES = { processing: 0, successful: 1, failed: 2 }.freeze
end
