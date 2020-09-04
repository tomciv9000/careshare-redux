class CreateDiapers < ActiveRecord::Migration[6.0]
  def change
    create_table :diapers do |t|
      t.boolean :wet
      t.boolean :soiled
      t.time :time
      t.int :shift_id

      t.timestamps
    end
  end
end
