class CsvUploadSerializer
  include JSONAPI::Serializer
  attributes :id, :filename, :total_keyword, :processed_keywords, :created_at, :status
end
