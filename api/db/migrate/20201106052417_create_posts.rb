class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :name
      t.integer :size
      t.integer :weight
      t.date :date
      t.time :time
      t.integer :number
      t.string :feed
      t.string :weather
      t.text :memo
      t.string :status
      t.timestamps
    end
  end
end
