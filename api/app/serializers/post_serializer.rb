class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status, :created_at, :updated_at
  has_many :likes
  has_many :comments, serializer: CommentSerializer do
    object.comments.order(id: :desc)
  end
  belongs_to :user
  has_many :likes_users, serializer: UserSerializer do
    object.likes.order(created_at: :desc)
  end
end


