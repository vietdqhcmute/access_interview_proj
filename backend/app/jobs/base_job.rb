class BaseJob < ApplicationJob
  queue_as :default
end
