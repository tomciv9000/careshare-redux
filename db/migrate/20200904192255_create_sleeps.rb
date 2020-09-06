class CreateSleeps < ActiveRecord::Migration[6.0]
  def change
    create_table :sleeps do |t|
      t.boolean :nap
      t.boolean :bedtime
      t.time :start_time
      t.time :end_time
      t.float :duration
      t.integer :shift_id

      t.timestamps
    end
  end
end
