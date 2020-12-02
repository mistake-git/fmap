class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status, :created_at, :updated_at, :image
  has_many :likes
  has_many :likes_users
  has_many :comments, serializer: CommentSerializer do
    object.comments.order(id: :desc)
  end
  belongs_to :user
end


