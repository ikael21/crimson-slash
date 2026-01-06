class SessionResource < ApplicationResource
  attributes :id, :user_agent, :ip_address, :created_at
end
