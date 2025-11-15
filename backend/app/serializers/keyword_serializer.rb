class KeywordSerializer < BaseSerializer
  attributes :id, :term, :status, :error_message, :created_at, :updated_at, :search_result
  attributes :search_result do |object|
    {
      id: object.search_result.id,
      totalResults: object.search_result.total_results,
      resultsWithThumbnails: object.search_result.results_with_thumbnails,
      resultsWithoutThumbnails: object.search_result.results_without_thumbnails,
      totalLinks: object.search_result.total_links,
      htmlContent: object.search_result.html_content,
      createdAt: object.search_result.created_at,
      updatedAt: object.search_result.updated_at
    }
  end
end
