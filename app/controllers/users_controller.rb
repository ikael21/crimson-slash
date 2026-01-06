class UsersController < InertiaController
  skip_before_action :authenticate, only: %i[new create]

  def new; end

  def create
    @user = User.new(user_params)
    return redirect_to sign_up_path, inertia: inertia_errors(@user) unless @user.save

    session_record = @user.sessions.create!
    cookies.signed.permanent[:session_token] = { value: session_record.id, httponly: true }

    UserMailer.with(user: @user).email_verification.deliver_later
    redirect_to dashboard_path, notice: 'Welcome! You have signed up successfully'
  end

  def destroy
    user = Current.user
    result = user.authenticate(params[:password_challenge] || '')
    return redirect_to settings_profile_path, inertia: {
      errors: {
        password_challenge: 'Password challenge is invalid'
      }
    } unless result

    user.destroy!
    Current.session = nil
    redirect_to root_path, notice: 'Your account has been deleted', inertia: { clear_history: true }
  end

  private
    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
