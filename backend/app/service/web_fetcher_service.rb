require 'faraday'

class WebFetcherService
  FETCH_TIMEOUT = 10 # seconds

  def fetch(url)
    response = connection.get(url)

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
      faraday.options.timeout = FETCH_TIMEOUT
      faraday.options.open_timeout = FETCH_TIMEOUT
      faraday.adapter Faraday.default_adapter
    end
  end
end
