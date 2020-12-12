class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  validates :name, presence: true
  validates :email, presence: true
  validates :uid, presence: true
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :likes_posts, through: :likes, source: :post
  has_many :posts, dependent: :destroy
  has_one_attached :image

  def image_url
    image.attached? ?  url_for(image) : nil
  end

end
