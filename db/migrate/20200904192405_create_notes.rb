class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :content
      t.integer :shift_id

      t.timestamps
    end
  end
end
