require 'rails_helper'

RSpec.describe "CsvUploads", type: :request do
  let(:user) { create(:user, password: 'password123') }

  before do
    sign_in user
  end

  describe "GET /csv_upload" do
    let!(:csv_uploads) { create_list(:csv_upload, 3, user: user) }

    it "returns a successful response" do
      get csv_upload_index_path
      expect(response).to have_http_status(:ok)
    end

    it "returns all csv uploads for the user" do
      get csv_upload_index_path
      json_response = JSON.parse(response.body)
      expect(json_response['data'].length).to eq(3)
    end
  end

  describe "GET /csv_upload/:id" do
    let(:csv_upload) { create(:csv_upload, :successful, user: user) }

    it "returns a successful response" do
      get csv_upload_path(csv_upload)
      expect(response).to have_http_status(:ok)
    end

    it "returns the csv upload details" do
      get csv_upload_path(csv_upload)
      json_response = JSON.parse(response.body)
      expect(json_response['data']['id']).to eq(csv_upload.id.to_s)
      expect(json_response['data']['attributes']['status']).to eq('successful')
    end
  end

  describe "POST /csv_upload" do
    let(:csv_file) { fixture_file_upload('test.csv', 'text/csv') }

    context "with valid CSV file" do
      it "creates a new csv upload" do
        expect {
          post csv_upload_index_path, params: { file: csv_file }
        }.to change(CsvUpload, :count).by(1)
      end

      it "returns created status" do
        post csv_upload_index_path, params: { file: csv_file }
        expect(response).to have_http_status(:created)
      end

      it "enqueues background jobs for keywords" do
        expect {
          post csv_upload_index_path, params: { file: csv_file }
        }.to have_enqueued_job(CrawlWikipediaJob).exactly(6).times
      end
    end



    context "with more than 100 keywords" do
      let(:large_csv_file) { fixture_file_upload('large_test.csv', 'text/csv') }

      it "does not create a csv upload" do
        expect {
          post csv_upload_index_path, params: { file: large_csv_file }
        }.not_to change(CsvUpload, :count)
      end

      it "returns unprocessable entity status" do
        post csv_upload_index_path, params: { file: large_csv_file }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns an error message" do
        post csv_upload_index_path, params: { file: large_csv_file }
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to include('100')
      end
    end

    context "without file parameter" do
      it "returns bad request status" do
        post csv_upload_index_path, params: {}
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe "DELETE /csv_upload/:id" do
    let!(:csv_upload) { create(:csv_upload, user: user) }

    it "deletes the csv upload" do
      expect {
        delete csv_upload_path(csv_upload)
      }.to change(CsvUpload, :count).by(-1)
    end

    it "returns ok status" do
      delete csv_upload_path(csv_upload)
      expect(response).to have_http_status(:ok)
    end
  end
end
