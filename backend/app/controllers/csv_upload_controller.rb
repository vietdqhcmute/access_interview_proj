require "csv"

class CsvUploadController < ApplicationController
  include ::CsvUploadHelper
  include ::KeywordHelper
  before_action :authenticate_user!

  def create
    if params[:file].nil?
      render json: { error: 'No file uploaded' }, status: :bad_request
      return
    end

    begin
      csv_file_name = params[:file].original_filename
      csv_keyword_list = get_csv_list_from_upload(params[:file])

      csv_upload = create_csv_record(current_user, csv_file_name, csv_keyword_list.size)
      csv_keyword_list.each do |keyword|
        create_keyword_record(keyword, csv_upload)
        ::Jobs::CrawlWikipediaJob.perform_later(keyword, csv_upload.id)
      end

      render json: { message: "#{created_count} users created successfully" }, status: :created
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def index
    render json: { message: 'CSV Upload Endpoint' }
  end

  def show
    render json: { message: 'Show CSV Upload Endpoint' }
  end
end
