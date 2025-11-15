class HtmlParserService
  require "nokogiri"

  def initialize(html_content)
    @html_content = html_content
  end

  def parse
    # Example parsing logic: extract all text within <p> tags
    doc = Nokogiri::HTML(@html_content)
    paragraphs = doc.css('p').map(&:text)
    paragraphs
  end
end
