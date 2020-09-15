class Spell {

    static all = [];
    static editedSpellId = null;


constructor(id, name, process, intention, description, components) {
    this.id = id;
    this.name = name;
    this.process = process;
    this.intention = intention;
    this.description = description;
    this.components = components
}

display () {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const h5process = document.createElement('h5');
    const h5intention = document.createElement('h5');
    const p = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const componentList = document.createElement('ul')

// Build out delete and edit functions here.

h4.innerText = this.name
h5process.innerText = this.process
h5intention.innerText = this.intention
p.innerText = this.description

editButton.innerText = "Edit"
editButton.id = this.id
editButton.addEventListener('click', Spell.editSpell)

deleteButton.innerText = "Delete"
deleteButton.id = this.id
deleteButton.addEventListener('click', Spell.deleteSpell)

this.components.forEach(component => {
    const componentItem = document.createElement('li')
    componentItem.innerText = component.name
    componentItem.id = component.id
    componentList.appendChild(componentItem)
})

div.appendChild(h4)
div.appendChild(h5process)
div.appendChild(h5intention)
div.appendChild(p)
div.appendChild(componentList)
div.appendChild(editButton)
div.appendChild(deleteButton)

spellList().appendChild(div)

}

static createSpells(spellsData) {
    spellsData.forEach(spell => Spell.create(spell.id, spell.name, spell.process, spell.intention, spell.description, spell.components))
}

static create(id, name, process, intention, description, components) {
    let spell = new Spell(id, name, process, intention, description, components);

    Spell.all.push(spell);

    return spell;
}

static displaySpells() {
    spellList().innerHTML = '';
    Spell.all.forEach(spell => {
        spell.display()
    })
}

static createFromForm(e) {
    e.preventDefault();

    if (editingSpell) {
        Spell.updateSpell()
    } else {
        const strongParams = {
            spell: {
                name: spellName().value,
                process: spellProcess().value,
                intention: spellIntention().value,
                description: spellDescription().value,
            }
        }
        fetch(baseUrl + '/spells.json', {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let spell = Spell.create(data.id, data.name, data.process, data.intention, data.description, data.components);
            spell.display();
        })

        resetInputs();
    }
}

static editSpell() {
    editingSpell = true;
    spellName().value = this.parentNode.querySelector('h4').innerText;
    const options = spellProcess().options
    
    for (const option in options) {
        if (options[option].value == this.parentNode.querySelectorAll('h5')[0].innerText ) {
            options.selectedIndex = options[option].index
        }
    }
    // spellIntention().options.forEach(option => {
    //     if (option.value == this.parentNode.querySelectorAll('h5')[1].innerText ) {
    //         option.selected = true
    //     }
    // })
    spellDescription().value = this.parentNode.querySelector('p').innerText;
    submitButton().value = "Update Spell"

    Spell.editedSpellId = this.id
}

static updateSpell() {

    const strongParams = {
        spell: {
            name: spellName().value,
            process: spellProcess().value,
            intention: spellIntention().value,
            description: spellDescription().value,
        }
    }

    fetch(baseUrl + '/spells/' + Spell.editedSpellId, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {

        let editedSpell = Spell.all.find(spell => spell.id == data.id)
        editedSpell.name = data.name
        editedSpell.process = data.process
        editedSpell.intention = data.intention
        editedSpell.description = data.description

        Spell.displaySpells()

        resetInputs()
        editingSpell = false
        Spell.editedSpellId = null
        submitButton().value = "Create Spell"
    })
}

static deleteSpell() {

    fetch(baseUrl + '/spells/' + this.id, {
        method: "DELETE"
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        this.parentNode.remove();
    })
}

}