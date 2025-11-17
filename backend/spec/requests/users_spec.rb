require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:user) { create(:user, password: 'password123') }

  before do
    sign_in user
  end

  describe "GET /index" do
    it "returns a successful response" do
      get users_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "returns a successful response" do
      get user_path(user)
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /create" do
    let(:valid_attributes) { { user: { name: "John Doe", email: "newuser@example.com", password: "password123" } } }

    it "creates a new user" do
      expect {
        post users_path, params: valid_attributes
      }.to change(User, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end
end
