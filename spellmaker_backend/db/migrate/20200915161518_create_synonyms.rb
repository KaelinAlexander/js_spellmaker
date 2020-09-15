class CreateSynonyms < ActiveRecord::Migration[6.0]
  def change
    create_table :synonyms do |t|
      t.string :name
      t.references :component, null: false, foreign_key: true
    end
  end
end
