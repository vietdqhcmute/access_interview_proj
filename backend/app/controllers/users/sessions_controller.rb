class Users::SessionsController < Devise::SessionsController
  respond_to :json

  before_action :remove_session_cookie

  private

  def remove_session_cookie
    # Prevent Devise from setting session cookies
    request.session_options[:skip] = true
  end

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_secret = ENV['DEVISE_JWT_SECRET_KEY']

      if jwt_secret.blank?
        Rails.logger.error("DEVISE_JWT_SECRET_KEY is not set. Please add it to your .env file.")
        render json: { status: { code: 500, message: "Server configuration error." } }, status: :internal_server_error
        return
      end

      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, jwt_secret).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: { code: 200, message: 'Logged out successfully.' }
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Couldn't find an active session." }
      }, status: :unauthorized
    end
  end
end
