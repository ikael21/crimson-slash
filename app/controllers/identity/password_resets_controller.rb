class Identity::PasswordResetsController < InertiaController
  skip_before_action :authenticate

  before_action :set_user, only: %i[ edit update ]

  def new; end

  def edit
    render inertia: { email: @user.email, sid: params[:sid] }
  end

  def create
    @user = User.find_by(email: params[:email], verified: true)
    alert_message = "You can't reset your password until you verify your email"
    return redirect_to new_identity_password_reset_path, alert: alert_message unless @user.present?

    send_password_reset_email
    redirect_to sign_in_path, notice: 'Check your email for reset instructions'
  end

  def update
    notice_message = 'Your password was reset successfully. Please sign in'
    return redirect_to sign_in_path, notice: notice_message if @user.update(user_params)

    redirect_to edit_identity_password_reset_path(sid: params[:sid]), inertia: inertia_errors(@user)
  end

  private
    def set_user
      @user = User.find_by_token_for!(:password_reset, params[:sid])
    rescue StandardError
      redirect_to new_identity_password_reset_path, alert: 'That password reset link is invalid'
    end

    def user_params
      params.permit(:password, :password_confirmation)
    end

    def send_password_reset_email
      UserMailer.with(user: @user).password_reset.deliver_later
    end
end
