class HtmlParserService
  require "nokogiri"

  def initialize(html_content)
    @html_content = html_content
  end

  protected

  def doc
    @doc ||= Nokogiri::HTML(@html_content)
  end
end
