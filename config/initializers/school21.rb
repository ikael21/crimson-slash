School21.configure do |config|
  config.credentials = Rails.application.credentials.dig(:school21)

  if Rails.env.development?
    config.logger = Rails.logger
    config.enable_logging = true
  end
end
