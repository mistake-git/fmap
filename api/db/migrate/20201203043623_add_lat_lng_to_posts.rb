class AddLatLngToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :address, :string
    add_column :posts, :latitude, :integer
    add_column :posts, :longitude, :integer
  end
end
