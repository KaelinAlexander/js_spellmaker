class CreateComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :components do |t|
      t.string :name
      t.string :latin
      t.string :planet
      t.string :element
      t.text :description
      t.boolean :toxic
    end
  end
end
