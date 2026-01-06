source 'https://rubygems.org'

gem 'rails', '~> 8.1.1'
gem 'propshaft'
gem 'pg', '~> 1.1'
gem 'puma', '>= 5.0'
gem 'jbuilder'

gem 'bcrypt', '~> 3.1.7'
gem 'tzinfo-data', platforms: %i[ windows jruby ]
gem 'bootsnap', require: false
gem 'kamal', require: false
gem 'thruster', require: false

gem 'school21_api_sdk', require: 'school21'

# Frontend
gem 'inertia_rails', '~> 3.14'
gem 'vite_rails', '~> 3.0'

gem 'typelizer'
gem 'alba'

group :development, :test do
  gem 'js-routes'
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'
  gem 'bundler-audit', require: false
  gem 'brakeman', require: false
  gem 'rubocop-rails-omakase', require: false
end

group :development do
  gem 'web-console'
  gem 'letter_opener'
  gem 'letter_opener_web'
  gem 'authentication-zero', '~> 4.0'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
end
