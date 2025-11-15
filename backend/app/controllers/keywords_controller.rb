class KeywordsController < ApplicationController
  before_action :authenticate_user!

  def index
    keywords = Keyword.where(csv_upload_id: params[:csv_upload_id])
    render json: KeywordSerializer.new(keywords).serializable_hash, status: :ok
  end

  def show
    keyword = Keyword.find(params[:id])
    render json: KeywordSerializer.new(keyword).serializable_hash, status: :ok
  end
end
