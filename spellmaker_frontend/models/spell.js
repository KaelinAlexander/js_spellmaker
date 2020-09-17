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

this.components.forEach(spellcomponent => {
    const componentItem = document.createElement('li')
    componentItem.innerText = spellcomponent.name
    componentItem.id = spellcomponent.id
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

    if (editingSpell && Spell.validateForm() == true ) {
        Spell.updateSpell()
    } else if (Spell.validateForm() == true ) {
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
        .catch(function(error) {
            debugger
            alert("Sometimes things go bad just because.");
            alert(error);
        })

        resetInputs();
    }
}

static editSpell() {
    editingSpell = true;
    const spellToEdit = Spell.all.find(spell => spell.id == this.id)

    spellName().value = this.parentNode.querySelector('h4').innerText;
    const options = spellProcess().options

    spellProcess().innerHTML = 
    `
    <option value="" disabled>--Choose a Process--</option>
    <option value="Charm" ${ spellToEdit.process == "Charm" ? 'selected' : ''}>Charm</option>
    <option value="Infusion" ${ spellToEdit.process == "Infusion" ? 'selected' : ''}>Infusion</option>
    <option value="Bath" ${ spellToEdit.process == "Bath" ? 'selected' : ''}>Bath</option>
    <option value="Ointment" ${ spellToEdit.process == "Ointment" ? 'selected' : ''}>Ointment</option>
    <option value="Incense" ${ spellToEdit.process == "Incense" ? 'selected' : ''}>Incense</option>
    `
    $('select').formSelect();

    // for (const option in options) {
    //     if (options[option].value == this.parentNode.querySelectorAll('h5')[0].innerText ) {
    //         options.selectedIndex = options[option].index
    //     }
    // }
    // $('select').formSelect();
    // spellIntention().options.forEach(option => {
    //     if (option.value == this.parentNode.querySelectorAll('h5')[1].innerText ) {
    //         option.selected = true
    //     }
    // })

    spellDescription().value = this.parentNode.querySelector('p').innerText;
    submitSpell().value = "Update Spell"

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
        submitSpell().value = "Create Spell"
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

static validateForm() {
    
    let validationValue = true

    if (spellName().value == "") {
        alert("Spell needs a name!");
        validationValue = false;
    } 

    if (spellProcess().value == "") {
        alert("Spell needs a process!");
        validationValue = false;
    }

    if (spellIntention().value == "") {
        alert("Spell needs an intention!");
        validationValue = false;
    }

    return validationValue

}

// function reloadProcessSelectors() {
//     spellProcess().innerHTML = 
//     `
//     <option value="" disabled>--Choose a Process--</option>
//     <option value="Charm" ${ spellToEdit.process == "Charm" ? 'selected' : ''}>Charm</option>
//     <option value="Infusion" ${ spellToEdit.process == "Infusion" ? 'selected' : ''}>Infusion</option>
//     <option value="Bath" ${ spellToEdit.process == "Bath" ? 'selected' : ''}>Bath</option>
//     <option value="Ointment" ${ spellToEdit.process == "Ointment" ? 'selected' : ''}>Ointment</option>
//     <option value="Incense" ${ spellToEdit.process == "Incense" ? 'selected' : ''}>Incense</option>
//     `
//     $('select').formSelect();
// }

}

