class CreateDeities < ActiveRecord::Migration[6.0]
  def change
    create_table :deities do |t|
      t.string :name
    end
  end
end
