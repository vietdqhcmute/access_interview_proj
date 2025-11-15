module KeywordHelper
  def create_keyword_record(keyword, csv_upload)
    Keyword.create(
      term: keyword,
      csv_upload: csv_upload,
      status: Keyword::STATUSES[:processing]
    )
  end

  def update_keyword_status(keyword, status, result_data = nil)
    keyword.update(
      status: status,
      result: result_data
    )
  end
end
