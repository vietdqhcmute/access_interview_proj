# Allow all hosts in test and development environments
Rails.application.configure do
  config.hosts.clear if Rails.env.test? || Rails.env.development?
end
