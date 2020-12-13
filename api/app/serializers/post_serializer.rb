class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status, :created_at, :updated_at, :image, :latitude, :longitude
  has_many :likes
  has_many :likes_users
  belongs_to :user
end


