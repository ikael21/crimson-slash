class Settings::SessionsController < InertiaController
  def index
    sessions = SessionResource.new(Current.user.sessions.order(created_at: :desc))

    render inertia: { sessions: }
  end
end
