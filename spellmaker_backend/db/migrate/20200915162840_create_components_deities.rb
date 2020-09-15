class CreateComponentsDeities < ActiveRecord::Migration[6.0]
  def change
    create_table :components_deities do |t|
      t.references :component, null: false, foreign_key: true
      t.references :deity, null: false, foreign_key: true
    end
  end
end
