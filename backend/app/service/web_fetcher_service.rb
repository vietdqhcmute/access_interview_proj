require 'faraday'

class WebFetcherService
  FETCH_TIMEOUT = 10 # seconds
  USER_AGENTS = [
    # 1. Chrome on Windows 10
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    # 2. Safari on Mac OS (Newer Version)
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
    # 3. Firefox on Linux (Newer Version)
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
    # 4. Edge on Windows 10
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46",
    # 5. Googlebot (A common crawler ID, sometimes useful for specific sites)
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    # 6. iOS Safari on iPhone (Mobile Agent)
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    # 7. Chrome on Mac OS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    # 8. Firefox on Windows 10
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    # 9. Android Chrome (Mobile Agent)
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36",
    # 10. Opera on Windows 10
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0"
  ]

  def fetch(base_url, keyword)
    response = connection.get(base_url + "&search=#{ERB::Util.url_encode(keyword)}")

    if response.success?
      response.body
    else
      raise "Failed to fetch URL: #{response.status} #{response.reason_phrase}"
    end
  rescue Faraday::Error => e
    Rails.logger.error("WebFetcherService Error: #{e.message}")
    nil
  rescue StandardError => e
    Rails.logger.error("WebFetcherService Error: #{e.message}")
    nil
  end

  private

  def connection
    @connection ||= Faraday.new do |faraday|
      # Randomly select a User-Agent for each request
      faraday.headers['User-Agent'] = USER_AGENTS.sample
      # Mimic a real browser's headers
      faraday.headers['Accept-Language'] = "en-US,en;q=0.9"
      faraday.headers['Accept'] = "text/html,application/xhtml+xml"
      faraday.headers['Referer'] = "https://www.google.com/"

      faraday.options.timeout = FETCH_TIMEOUT
      faraday.options.open_timeout = FETCH_TIMEOUT
      faraday.adapter Faraday.default_adapter
    end
  end
end
