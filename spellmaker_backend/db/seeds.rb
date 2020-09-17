# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..10).to_a.each do |num|
    Spell.create(name: "Spell #{num}", process: "Charm", intention: "Exorcism", description: "Here's a description of the spell.")
end

(1..10).to_a.each do |num|
    Component.create(name: "Component #{num}", latin: "Nomen Latine", planet: "Mercury", element: "Air", description: "Here's a description of the component, including assocciated lore.", toxic: false)
end

(1..10).to_a.each do |num|
    SpellsComponent.create(parts: num, spell_id: num, component_id: num)
end

(1..10).to_a.each do |num|
    Synonym.create(name: "Synonym #{num}A", component_id: num)
end

(1..10).to_a.each do |num|
    Synonym.create(name: "Synonym #{num}B", component_id: num)
end

(1..10).to_a.each do |num|
    Deity.create(name: "Deity #{num}")
end

(1..10).to_a.each do |num|
    ComponentsDeity.create(component_id: num, deity_id: num)
end

Use.create(name: "Protection")
Use.create(name: "Love" )
Use.create(name: "Exorcism" )
Use.create(name: "Healing" )
Use.create(name: "Hex Breaking" )
Use.create(name: "Fidelity" )
Use.create(name: "Luck" )
Use.create(name: "Lust" )
Use.create(name: "Money" )
Use.create(name: "Clairvoyance" )
Use.create(name: "Sleep" )
Use.create(name: "Fertility" )
Use.create(name: "Purification" )
Use.create(name: "Wisdom" )
Use.create(name: "Spirituality" )
Use.create(name: "Mood" )

(1..10).to_a.each do |num|
    ComponentsUse.create(component_id: num, use_id: num)
end