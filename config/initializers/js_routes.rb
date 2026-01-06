JsRoutes.setup do |config|
  config.camel_case = true
  config.file = Rails.root.join('app/frontend/routes.js')
end
