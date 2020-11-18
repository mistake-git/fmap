class PostSerializer < ActiveModel::Serialize
  attributes :id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status, :created_at, :updated_at
  has_many :comments, serializer: CommentSerializer do
    object.comments.order(id: :desc)
  end
  belongs_to :user
end


