# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..2).to_a.each do |num|
    Spell.create(name: "Incense #{num}", process: "Incense", intention: "Exorcism", description: "Here's a description of the spell.")
end

(1..2).to_a.each do |num|
    Spell.create(name: "Ointment #{num}", process: "Ointment", intention: "Exorcism", description: "Here's a description of the spell.")
end

(1..2).to_a.each do |num|
    Spell.create(name: "Infusion #{num}", process: "Infusion", intention: "Exorcism", description: "Here's a description of the spell.")
end

(1..2).to_a.each do |num|
    Spell.create(name: "Bath #{num}", process: "Bath", intention: "Exorcism", description: "Here's a description of the spell.")
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

Component.create(name: "Basil", latin: "Ocimum basilicum", planet: "Mars", element: "Fire", description: "The scent of fresh basil causes sympathy between two people.", toxic: false)
Component.create(name: "Cabbage", latin: "Brassica oleracea", planet: "Moon", element: "Water", description: "If planted shortly after marriage, will prove a boon to it.", toxic: false)
Component.create(name: "Catnip", latin: "Nepeta cataria", planet: "Venus", element: "Water", description: "Often used in love sachets.", toxic: false)
Component.create(name: "Chamomile", latin: "Chameamelum nobile", planet: "Sun", element: "Water", description: "Sometimes used as a handwash for gamblers.", toxic: false)
Component.create(name: "Columbine", latin: "Aquilegia canadensis", planet: "Venus", element: "Water", description: "Rubbing the dry herb on your hands encourages daring.", toxic: true)
Component.create(name: "Dill", latin: "Anethum graveolens", planet: "Mercury", element: "Fire", description: "The herb is protective when hung over a door.", toxic: false)
Component.create(name: "Honeysuckle", latin: "Lonicera caprifolium", planet: "Jupiter", element: "Earth", description: "Lightly crush the flowers and then rub them on your forehead to increase clairvoyance.", toxic: false)
Component.create(name: "Marigold", latin: "Calendula officinalis", planet: "Sun", element: "Fire", description: "Effects are strongest when picked at noon.", toxic: false)
Component.create(name: "Mint", latin: "Mentha spp.", planet: "Mercury", element: "Air", description: "Long used in many headache remedies.", toxic: false)
Component.create(name: "Foxglove", latin: "Digitalis purpurea", planet: "Venus", element: "Water", description: "In the past, the leaves were used to create a black dye.", toxic: true)

Deity.create(name: "Vishnu")
Deity.create(name: "Erzulie")
Deity.create(name: "Bast")
Deity.create(name: "Pluto")
Deity.create(name: "Hecate")

ComponentsDeity.create(component_id: 1, deity_id: 1)
ComponentsDeity.create(component_id: 1, deity_id: 2)
ComponentsDeity.create(component_id: 3, deity_id: 3)
ComponentsDeity.create(component_id: 9, deity_id: 4)
ComponentsDeity.create(component_id: 9, deity_id: 5)

ComponentsUse.create(component_id: 1, use_id: 1)
ComponentsUse.create(component_id: 1, use_id: 2)
ComponentsUse.create(component_id: 1, use_id: 3)

ComponentsUse.create(component_id: 2, use_id: 7)

ComponentsUse.create(component_id: 3, use_id: 2)
ComponentsUse.create(component_id: 3, use_id: 16)

ComponentsUse.create(component_id: 4, use_id: 11)
ComponentsUse.create(component_id: 4, use_id: 13)

ComponentsUse.create(component_id: 5, use_id: 16)
ComponentsUse.create(component_id: 5, use_id: 2)

ComponentsUse.create(component_id: 6, use_id: 1)
ComponentsUse.create(component_id: 6, use_id: 2)
ComponentsUse.create(component_id: 6, use_id: 8)
ComponentsUse.create(component_id: 6, use_id: 9)

ComponentsUse.create(component_id: 7, use_id: 1)
ComponentsUse.create(component_id: 7, use_id: 9)
ComponentsUse.create(component_id: 7, use_id: 10)

ComponentsUse.create(component_id: 8, use_id: 1)
ComponentsUse.create(component_id: 8, use_id: 10)
ComponentsUse.create(component_id: 8, use_id: 11)

ComponentsUse.create(component_id: 9, use_id: 9)
ComponentsUse.create(component_id: 9, use_id: 8)
ComponentsUse.create(component_id: 9, use_id: 4)

(1..10).to_a.each do |num|
    Synonym.create(name: "Synonym #{num}A", component_id: num)
end

(1..10).to_a.each do |num|
    Synonym.create(name: "Synonym #{num}B", component_id: num)
end

# (1..10).to_a.each do |num|
#     SpellsComponent.create(parts: num, spell_id: num, component_id: num)
# end

# (1..10).to_a.each do |num|
#     Deity.create(name: "Deity #{num}")
# end

# (1..10).to_a.each do |num|
#     ComponentsDeity.create(component_id: num)
# end

# (1..10).to_a.each do |num|
#     Component.create(name: "Component #{num}", latin: "Nomen Latine", planet: "Mercury", element: "Air", description: "Here's a description of the component, including assocciated lore.", toxic: false)
# end

# (1..10).to_a.each do |num|
#     ComponentsUse.create(component_id: num, use_id: num)
# end

