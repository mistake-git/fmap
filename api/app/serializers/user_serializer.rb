class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :introduction, :uid, :image_url, :posts, :likes_posts
  has_many :posts, serializer: PostSerializer do
    object.posts.order(created_at: :desc)
  end
  has_many :likes_posts
end
