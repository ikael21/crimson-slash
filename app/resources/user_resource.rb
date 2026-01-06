class UserResource < ApplicationResource
  attributes :id, :name, :email, :verified, :created_at, :updated_at
  typelize avatar_url: :string
end
