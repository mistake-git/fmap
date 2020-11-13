class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :weather, :weight, :date, :time, :number, :feed, :memo, :status
  has_many :comments, serializer: CommentSerializer do
    object.comments.order(created_at: :desc)
  end
end


