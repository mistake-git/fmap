class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :introduction
  has_many :posts, serializer: PostSerializer do
    object.posts.order(created_at: :desc)
  end
end
