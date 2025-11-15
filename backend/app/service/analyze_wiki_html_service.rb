class AnalyzeWikiHtmlService < HtmlParserService
  def extract_total_result
    total_result_xpath = '//*[@id="mw-search-top-table"]/div[2]/strong[2]'
    node = doc.xpath(total_result_xpath).children.first
    value = node.text.gsub(",", "").to_i
    value
  end

  def get_number_of_thumbnails_results
    selector = '.searchResultImage-thumbnail img'
    doc.css(selector).size
  end

  def get_number_of_non_thumbnails_results
    selector = '.searchResultImage-thumbnail-placeholder'
    doc.css(selector).size
  end

  def total_link_on_page
    doc.css('a').size
  end
end
