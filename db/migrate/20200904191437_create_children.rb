class CreateChildren < ActiveRecord::Migration[6.0]
  def change
    create_table :children do |t|
      t.string :name
      t.date :birthday
      t.int :user_id

      t.timestamps
    end
  end
end
