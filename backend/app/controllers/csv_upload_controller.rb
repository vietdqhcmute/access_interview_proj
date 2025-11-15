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
        CrawlWikipediaJob.perform_later(keyword, csv_upload.id)
      end

      render json: CsvUploadSerializer.new(csv_upload).serializable_hash, status: :created
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def index
    csv_uploads = current_user.csv_uploads
    render json: CsvUploadSerializer.new(csv_uploads).serializable_hash, status: :ok
  end

  def show
    csv_upload = current_user.csv_uploads.find(params[:id])
    render json: CsvUploadSerializer.new(csv_upload).serializable_hash, status: :ok
  end
end
