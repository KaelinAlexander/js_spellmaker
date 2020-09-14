# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..10).to_a.each do |num|
    Spell.create(name: "Spell #{num}", process: "Charm", intention: "Intention #{num}", description: "Here's a description of the spell.")
end

(1..10).to_a.each do |num|
    Component.create(name: "Component #{num}", latin: "Nomen Latine", planet: "Celestial Body", element: "Element", description: "Here's a description of the component, including assocciated lore.")
end