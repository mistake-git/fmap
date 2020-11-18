class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :introduction
  has_many :posts, serializer: Posterializer do
    object.posts.order(created_at: :desc)
  end
end
