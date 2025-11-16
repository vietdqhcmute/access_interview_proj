class CleanupFalseCrawlingProgressWorker
  include Sidekiq::Worker
  sidekiq_options queue: :scheduler, retry: false

  def perform
    in_progress_csv_uploads = CsvUpload.where(status: CsvUpload::STATUSES[:processing])
    in_progress_csv_uploads.each do |csv_upload|
      total_keywords = csv_upload.total_keyword
      successful_keywords_size = csv_upload.keywords.where(status: Keyword::STATUSES[:successful]).size
      if (total_keywords == successful_keywords_size)
        csv_upload.update(status: CsvUpload::STATUSES[:successful], processed_keywords: successful_keywords_size)
      end
    end
    Rails.logger.info "Falsy data cleaned at #{Time.current}"
  end
end
