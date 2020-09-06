class CreateChildren < ActiveRecord::Migration[6.0]
  def change
    create_table :children do |t|
      t.string :name
      t.date :birthday
      t.integer :user_id

      t.timestamps
    end
  end
end
