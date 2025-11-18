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

      if csv_keyword_list.size > 100
        render json: { error: 'CSV file contains more than 100 keywords. Maximum allowed is 100.' }, status: :unprocessable_entity
        return
      end

      csv_upload = create_csv_record(current_user, csv_file_name, csv_keyword_list.size)
      csv_keyword_list.each do |keyword|
        new_keyword_record = create_keyword_record(keyword, csv_upload)
        CrawlWikipediaJob.perform_later(new_keyword_record.id, csv_upload.id)
      end

      render json: CsvUploadSerializer.new(csv_upload).serializable_hash, status: :created
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def index
    csv_uploads = current_user.csv_uploads.order(created_at: :desc)
    render json: CsvUploadSerializer.new(csv_uploads).serializable_hash, status: :ok
  end

  def show
    csv_upload = current_user.csv_uploads.find(params[:id])
    page = params[:page] || 1
    per_page = params[:per_page] || 25

    keywords_query = csv_upload.keywords
    keywords_query = keywords_query.where("term ILIKE ?", "%#{params[:term]}%") if params[:term].present?

    paginated_keywords = keywords_query.page(page).per(per_page)

    render json: {
      data: CsvUploadDetailSerializer.new(csv_upload, params: { keywords: paginated_keywords }).serializable_hash[:data],
      meta: {
        current_page: paginated_keywords.current_page,
        total_pages: paginated_keywords.total_pages,
        total_count: paginated_keywords.total_count,
        per_page: per_page.to_i
      }
    }, status: :ok
  end

  def destroy
    csv_upload = current_user.csv_uploads.find(params[:id])
    csv_upload.destroy
    render json: { message: 'CSV upload and associated keywords deleted successfully.' }, status: :ok
  end
end
