class Post < ApplicationRecord
  validates :name, presence: true, format: { with: /\A[\p{katakana}\p{blank}ー－]+\z/ }
  validates :latitude, presence: true
  validates :longitude, presence: true
  belongs_to :user
  has_one_attached :image
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :likes_users, through: :likes, source: :user
end
