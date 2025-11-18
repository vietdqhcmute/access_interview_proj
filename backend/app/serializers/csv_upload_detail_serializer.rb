class CsvUploadDetailSerializer < BaseSerializer
  attributes :id, :filename, :total_keyword, :processed_keywords, :keywords, :created_at, :status

  attribute :keywords do |object, params|
    keywords_collection = params && params[:keywords] ? params[:keywords] : object.keywords
    keywords_collection.map do |keyword|
      {
        id: keyword.id,
        term: keyword.term,
        status: keyword.status,
        errorMessage: keyword.error_message,
        createdAt: keyword.created_at
      }
    end
  end
end
