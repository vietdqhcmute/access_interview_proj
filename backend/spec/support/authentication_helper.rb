module AuthenticationHelper
  def auth_headers_for(user)
    post '/login', params: { user: { email: user.email, password: user.password } }
    token = response.headers['Authorization']
    { 'Authorization' => token }
  end
end

RSpec.configure do |config|
  config.include AuthenticationHelper, type: :request
  config.include Devise::Test::IntegrationHelpers, type: :request
end
