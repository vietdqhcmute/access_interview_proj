class CrawlWikipediaJob < BaseJob
  queue_as :default

  WIKIPEDIA_SEARCH_URL = "https://en.wikipedia.org/w/index.php?fulltext=1&title=Special%3ASearch&ns0=1"
  CRAWL_DELAY_RANGE = (1.0..3.5)

  def perform(keyword_id, csv_upload_id)
    keyword = Keyword.find(keyword_id)

    return if keyword.nil?

    update_keyword_status(keyword, Keyword::STATUSES[:processing])
    crawl_and_save_results(keyword)
    update_keyword_status(keyword, Keyword::STATUSES[:successful])

    update_csv_upload_status(csv_upload_id)
  rescue StandardError => e
    handle_error(keyword, e)
  end

  private

  def update_keyword_status(keyword, status)
    keyword.update_attribute!(:status, status)
  end

  def crawl_and_save_results(keyword)
    # Add random delay to avoid rate limiting
    sleep(rand(CRAWL_DELAY_RANGE))

    html_content = fetch_wikipedia_page(keyword.term)
    analysis_results = analyze_html(html_content)

    create_search_result(keyword, html_content, analysis_results)
  end

  def fetch_wikipedia_page(term)
    fetcher.fetch(WIKIPEDIA_SEARCH_URL, term)
  end

  def analyze_html(html_content)
    analyzer = ::AnalyzeWikiHtmlService.new(html_content)
    {
      total_results: analyzer.extract_total_result,
      results_with_thumbnails: analyzer.get_number_of_thumbnails_results,
      results_without_thumbnails: analyzer.get_number_of_non_thumbnails_results,
      total_links: analyzer.total_link_on_page,
      html_content: ActionController::Base.helpers.sanitize(html_content)
    }
  end

  def create_search_result(keyword, html_content, analysis_results)
    SearchResult.create!(
      keyword: keyword,
      html_content: html_content,
      **analysis_results
    )
  end

  def update_csv_upload_status(csv_upload_id)
    csv_upload = CsvUpload.find(csv_upload_id)
    processed_count = csv_upload.processed_keywords.to_i + 1
    status =
      if processed_count >= csv_upload.total_keyword
        CsvUpload::STATUSES[:successful]
      else
        CsvUpload::STATUSES[:processing]
      end
    csv_upload.update(
      processed_keywords: processed_count,
      status: status
    )
  end

  def handle_error(keyword, error)
    update_keyword_status(keyword, Keyword::STATUSES[:failed])
    keyword.update(error_message: error.message)

    Rails.logger.error("CrawlWikipediaJob failed for keyword #{keyword.id}: #{error.message}")
    Rails.logger.error(error.backtrace.join("\n"))

    raise error # Re-raise to let Sidekiq handle retries
  end

  def fetcher
    @fetcher ||= ::WebFetcherService.new
  end
end
