class CreateUses < ActiveRecord::Migration[6.0]
  def change
    create_table :uses do |t|
      t.string :name
    end
  end
end
