class Spell {

    static all = [];
    static editedSpellId = null;


constructor(id, name, process, intention, description) {
    this.id = id;
    this.name = name;
    this.process = process;
    this.intention = intention;
    this.description = description;
}

display () {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const h5process = document.createElement('h5');
    const h5intention = document.createElement('h5');
    const p = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

// Build out delete and edit functions here.

h4.innerText = this.name
h5process.innerText = this.process
h5intention.innerText = this.intention
p.innerText = this.description
editButton.innerText = "Edit"
deleteButton.innerText = "Delete"

div.appendChild(h4)
div.appendChild(h5process)
div.appendChild(h5intention)
div.appendChild(p)
div.appendChild(editButton)
div.appendChild(deleteButton)

spellList().appendChild(div)

}

static createSpells(spellsData) {
    spellsData.forEach(spell => Spell.create(spell.id, spell.name, spell.process, spell.intention, spell.description))
}

static create(id, name, process, intention, description) {
    let spell = new Spell(id, name, process, intention, description);

    Spell.all.push(spell);

    return spell;
}

static displaySpells() {
    spellList().innerHTML = '';
    Spell.all.forEach(spell => {
        spell.display()
    })
}

}