class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :uid, presence: true
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :posts, dependent: :destroy
end
