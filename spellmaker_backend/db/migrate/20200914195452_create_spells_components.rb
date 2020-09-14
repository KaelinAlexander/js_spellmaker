class CreateSpellsComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :spells_components do |t|
      t.integer :parts
      t.references :spell, null: false, foreign_key: true
      t.references :component, null: false, foreign_key: true
    end
  end
end
