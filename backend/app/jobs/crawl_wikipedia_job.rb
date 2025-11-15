class CrawlWikipediaJob < BaseJob
  def perform(key_word, csv_upload_id)
    sleep(12) # Simulating a delay for the crawling process
    Keyword.find_by(csv_upload_id: csv_upload_id, term: key_word)&.update(status: Keyword::STATUSES[:successful])
    # Logic to crawl Wikipedia page by title
    # wikipedia_url = "https://en.wikipedia.org/wiki/#{URI.encode(page_title)}"
    # response = Net::HTTP.get(URI(wikipedia_url))
    # # Here you would parse the response and extract the needed information
    # puts "Crawled Wikipedia page for #{page_title}"
  end
end
