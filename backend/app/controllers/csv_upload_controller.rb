class CsvUploadController < ApplicationController
  before_action :authenticate_user!

  def create
    if params[:file].nil?
      render json: { error: 'No file uploaded' }, status: :bad_request
      return
    end

    begin
      csv_text = params[:file].read
      csv = CSV.parse(csv_text, headers: true)
      created_count = 0
      csv.each do |row|
        user_params = row.to_hash.slice('name', 'email')
        user = User.new(user_params)
        if user.save
          created_count += 1
        end
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
