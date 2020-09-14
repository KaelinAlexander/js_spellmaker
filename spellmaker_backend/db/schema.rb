# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_14_195452) do

  create_table "components", force: :cascade do |t|
    t.string "name"
    t.string "latin"
    t.string "planet"
    t.string "element"
    t.text "description"
  end

  create_table "spells", force: :cascade do |t|
    t.string "name"
    t.string "process"
    t.string "intention"
    t.text "description"
  end

  create_table "spells_components", force: :cascade do |t|
    t.integer "parts"
    t.integer "spell_id", null: false
    t.integer "component_id", null: false
    t.index ["component_id"], name: "index_spells_components_on_component_id"
    t.index ["spell_id"], name: "index_spells_components_on_spell_id"
  end

  add_foreign_key "spells_components", "components"
  add_foreign_key "spells_components", "spells"
end
