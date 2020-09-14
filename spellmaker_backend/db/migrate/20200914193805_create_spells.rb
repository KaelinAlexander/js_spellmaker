class CreateSpells < ActiveRecord::Migration[6.0]
  def change
    create_table :spells do |t|
      t.string :name
      t.string :process
      t.string :intention
      t.text :description

      t.timestamps
    end
  end
end
