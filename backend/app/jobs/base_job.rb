require 'sidekiq'
module Jobs
  class BaseJob < ApplicationJob
    include Sidekiq::Job

  end
end
