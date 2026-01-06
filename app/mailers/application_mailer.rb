class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  before_action :attach_logo

  private

  def attach_logo
    attachments.inline['logo.svg'] = {
      mime_type: 'image/svg+xml',
      content: File.read(Rails.root.join('app/assets/images/crimson-slash-logo.svg'))
    }
  end
end
