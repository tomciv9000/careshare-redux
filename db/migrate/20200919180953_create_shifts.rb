class CreateShifts < ActiveRecord::Migration[6.0]
  def change
    create_table :shifts do |t|
      t.datetime :date
      t.integer :user_id

      t.timestamps
    end
  end
end
