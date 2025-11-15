module CsvUploadHelper
  def create_csv_record(user, filename, total_keywords)
    CsvUpload.create(
      user: user,
      filename: filename,
      total_keyword: total_keywords,
      processed_keywords: 0,
      status: CsvUpload::STATUSES[:processing]
    )
  end

  def update_csv_record_status(csv_upload, processed_count, status)
    csv_upload.update(
      processed_keywords: processed_count,
      status: status
    )
  end

  def get_csv_list_from_upload(csv_upload)
    csv_text = csv_upload.read
    csv = CSV.parse(csv_text, headers: true)
    csv_keyword_list = csv.to_a.flatten
    csv_keyword_list
  end
end
