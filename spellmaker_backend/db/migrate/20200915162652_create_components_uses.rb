class CreateComponentsUses < ActiveRecord::Migration[6.0]
  def change
    create_table :components_uses do |t|
      t.references :component, null: false, foreign_key: true
      t.references :use, null: false, foreign_key: true
    end
  end
end
