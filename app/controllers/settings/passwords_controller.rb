class Settings::PasswordsController < InertiaController
  before_action :set_user

  def show; end

  def update
    return redirect_to settings_password_path, inertia: inertia_errors(@user) unless @user.update(user_params)
    redirect_to settings_password_path, notice: 'Your password has been changed'
  end

  private

  def set_user
    @user = Current.user
  end

  def user_params
    params.permit(:password, :password_confirmation, :password_challenge).with_defaults(password_challenge: '')
  end
end
