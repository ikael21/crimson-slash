class InertiaController < ApplicationController
  inertia_config default_render: true
  inertia_share flash: -> { flash.to_hash },
                auth: {
                  user: -> { current_user },
                  session: -> { current_session }
                }

  rescue_from StandardError, with: :inertia_error_page

  private
    def current_user
      Current.user.as_json(only: %i[id name email verified created_at updated_at], methods: :avatar_url)
    end

    def current_session
      Current.session.as_json(only: %i[id])
    end

    def inertia_errors(model, full_messages: true)
      { errors: model.errors.to_hash(full_messages).transform_values(&:to_sentence) }
    end

    def inertia_error_page(exception)
      raise exception if Rails.env.local?

      status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code
      render inertia: 'ErrorPage', props: { status: }, status:
    end
end
