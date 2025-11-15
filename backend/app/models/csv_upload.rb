class CsvUpload < ApplicationRecord
  belongs_to :user
  has_many :keywords, dependent: :destroy

  STATUSES = { processing: 0, successful: 1, failed: 2 }.freeze
end
