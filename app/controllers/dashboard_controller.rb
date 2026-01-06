class DashboardController < InertiaController
  def index
    response = School21.participants_api.participant_skills('ikael')

    render inertia: 'dashboard/index', props: { skills: response.data[:skills] }
  end
end
