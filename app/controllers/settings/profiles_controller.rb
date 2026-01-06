class Settings::ProfilesController < InertiaController
  before_action :set_user

  def show; end

  def update
    return redirect_to settings_profile_path, inertia: inertia_errors(@user) unless @user.update(user_params)

    redirect_to settings_profile_path, notice: 'Your profile has been updated'
  end

  private
    def user_params
      params.permit(:name)
    end

    def set_user
      @user = Current.user
    end
end
