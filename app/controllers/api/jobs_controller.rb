class Api::JobsController < ApplicationController
    def index
        render json: "BCB Carts Yelp Reviews Controller"
    end

    def pull_yelp_cache
        puts "Started Yelp cache pull for BCB Carts in Long Beach, CA"
        reviews = YelpCached.cached_yelp_reviews
        puts "Fetched Yelp reviews: #{reviews}"
        render json: reviews
    rescue StandardError => e
        puts "Error in pull_yelp_cache: #{e.message}"
        render json: { "error": e.message }, status: :internal_server_error
    end

    require 'redis'
    require 'json'
    require 'uri'
    require 'net/http'

    class YelpCached
        def self.remove_user_by_name(users, name)
        puts "Removing user: #{name}"
        users.reject! { |user| user['user']['name'] == name }
        end

        def self.cached_yelp_reviews
        puts "Connecting to Redis"
        puts "REDIS_URL"
        puts ENV['REDIS_URL']
        redis = Redis.new(
            url: ENV['REDIS_URL'],
            ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }
        )

        cached_data = redis.get('cached_yelp_reviews')
        if cached_data.present?
            puts "Found cached Yelp data"
            reviews = JSON.parse(cached_data)
            remove_user_by_name(reviews, 'Pdub ..')
            return JSON.generate(reviews)
        end

        businesses = [
            { alias: "bcb-carts-long-beach", location: "Long Beach, CA" }
        ]
        puts "Business aliases: #{businesses}"

        http = Net::HTTP.new("api.yelp.com", 443)
        http.use_ssl = true
        reviews = []

        businesses.each do |business|
            business_url = URI("https://api.yelp.com/v3/businesses/#{business[:alias]}")
            puts "Requesting Yelp business info for: #{business[:alias]}"
            business_request = Net::HTTP::Get.new(business_url)
            business_request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"
            business_response = http.request(business_request)
            business_parsed_response = JSON.parse(business_response.body)

            if business_parsed_response["error"]
            puts "Error retrieving business details: #{business_parsed_response['error']['description']}"
            next
            end

            url = URI("https://api.yelp.com/v3/businesses/#{business[:alias]}/reviews")
            puts "Fetching reviews for: #{business[:alias]}"
            request = Net::HTTP::Get.new(url)
            request["Authorization"] = "Bearer #{ENV['YELP_API_KEY']}"
            response = http.request(request)
            parsed_response = JSON.parse(response.body)

            if parsed_response["error"]
            puts "Error retrieving reviews: #{parsed_response['error']['description']}"
            next
            end

            parsed_reviews = parsed_response["reviews"]
            parsed_reviews.each do |review|
            puts "Processing review: #{review['id']}"
            review["text"] = review["text"].strip
            end

            limited_reviews = parsed_reviews.take(3)
            limited_reviews.each do |review|
            if review["rating"] == 5 && !reviews.any? { |r| r["id"] == review["id"] }
                reviews << review
            end
            end
        end

        redis.set("cached_yelp_reviews", JSON.generate(reviews))
        redis.expire("cached_yelp_reviews", 30.days.to_i)
        reviews = JSON.parse(redis.get("cached_yelp_reviews"))

        if reviews.present?
            remove_user_by_name(reviews, 'Pdub ..')
            return JSON.generate(reviews)
        end

        { reviews: "No cached reviews" }
        rescue StandardError => e
        puts "Error in cached_yelp_reviews: #{e.message}"
        { "error": e.message }
        end
    end
end
