class CreateInputs < ActiveRecord::Migration
  def change
    create_table :inputs do |t|
        t.text :piece
        t.timestamps
    end
  end
end
