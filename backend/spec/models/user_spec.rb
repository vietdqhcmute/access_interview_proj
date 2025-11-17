require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { create(:user) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    it 'validates email format' do
      user = User.new(name: 'Test', email: 'invalid')
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('is invalid')
    end
  end

  describe 'creating a user' do
    it 'creates a valid user' do
      params = { name: 'John Doe', email: 'john@example.com', password: 'password123'}
      user = User.create(params)
      expect(user).to be_valid
      expect(user.persisted?).to be true
    end

    it 'fails without a name' do
      user = User.new(email: 'john@example.com')
      expect(user).not_to be_valid
    end
  end
end
