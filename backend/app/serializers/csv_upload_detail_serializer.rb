class CsvUploadDetailSerializer
  include JSONAPI::Serializer
  attributes :id, :filename, :total_keyword, :processed_keywords, :keywords, :created_at, :status

  attribute :keywords do |object|
    object.keywords.map do |keyword|
      {
        id: keyword.id,
        term: keyword.term,
        status: keyword.status,
        error_message: keyword.error_message,
        created_at: keyword.created_at
      }
    end
  end
end
