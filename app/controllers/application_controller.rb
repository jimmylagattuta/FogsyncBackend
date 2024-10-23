class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authenticate_user
    before_action :ensure_www_subdomain

    def current_user
        User.find_by(id: session[:user_id])
    end
    def authenticate_user
        return render json: { error: "Not authorized" }, status: :unauthorized unless current_user
    end

    private
    def ensure_www_subdomain
        if request.host == "bcbcarts.com"
          redirect_to "#{request.protocol}www.bcbcarts.com#{request.fullpath}", status: :moved_permanently
        end
    end
    
end
