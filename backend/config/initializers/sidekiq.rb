require 'sidekiq/cron/web'

# Configure Redis connection for Heroku
redis_config = {
  url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0')
}

# Add SSL configuration for Heroku Redis
if ENV['REDIS_URL']&.start_with?('rediss://')
  redis_config[:ssl_params] = { verify_mode: OpenSSL::SSL::VERIFY_NONE }
end

Sidekiq.configure_server do |config|
  config.redis = redis_config

  # Enable sidekiq-cron poller
  config.on(:startup) do
    schedule_file = Rails.root.join('config', 'schedule.yml')
    if File.exist?(schedule_file)
      Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
    end
  end
end

Sidekiq.configure_client do |config|
  config.redis = redis_config
end
