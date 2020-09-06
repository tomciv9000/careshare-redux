class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.string :meal_type
      t.string :description
      t.time :time
      t.integer :shift_id

      t.timestamps
    end
  end
end
