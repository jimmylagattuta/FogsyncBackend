class FallbackController < ActionController::Base
	def index
	    response.headers['Cache-Control'] = 'public, max-age=3600, immutable'
	    response.headers['Surrogate-Control'] = 'max-age=3600'
		render file: 'public/index.html'
		# render file: 'es20client/public/index.html'
	end
end
