Typelizer.configure do |config|
  config.dirs = [Rails.root.join('app/resources')]
  config.output_dir = 'app/frontend/types/generated'
  config.comments = true
  config.types_import_path = '@/types'
end

Typelizer.listen = nil
