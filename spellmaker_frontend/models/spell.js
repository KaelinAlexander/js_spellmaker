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
    spellDescription().value = this.parentNode.querySelector('p').innerText;

    M.updateTextFields();

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

    spellIntention().innerHTML =
    `
    <option value="">--Choose an Intention--</option>
    <option value="Clairvoyance" ${ spellToEdit.intention == "Clairvoyance" ? 'selected' : ''}>Clairvoyance</option>
    <option value="Exorcism" ${ spellToEdit.intention == "Exorcism" ? 'selected' : ''}>Exorcism</option>
    <option value="Fertility" ${ spellToEdit.intention == "Fertility" ? 'selected' : ''}>Fertility</option>
    <option value="Fidelity" ${ spellToEdit.intention == "Fidelity" ? 'selected' : ''}>Fidelity</option>
    <option value="Healing" ${ spellToEdit.intention == "Healing" ? 'selected' : ''}>Healing</option>
    <option value="Hex Breaking" ${ spellToEdit.intention == "Hex Breaking" ? 'selected' : ''}>Hex Breaking</option>
    <option value="Love" ${ spellToEdit.intention == "Love" ? 'selected' : ''}>Love</option>
    <option value="Luck" ${ spellToEdit.intention == "Luck" ? 'selected' : ''}>Luck</option>
    <option value="Lust" ${ spellToEdit.intention == "Lust" ? 'selected' : ''}>Lust</option>
    <option value="Money" ${ spellToEdit.intention == "Money" ? 'selected' : ''}>Money</option>
    <option value="Mood" ${ spellToEdit.intention == "Mood" ? 'selected' : ''}>Mood</option>
    <option value="Protection" ${ spellToEdit.intention == "Protection" ? 'selected' : ''}>Protection</option>
    <option value="Purification" ${ spellToEdit.intention == "Purification" ? 'selected' : ''}>Purification</option>
    <option value="Sleep" ${ spellToEdit.intention == "Sleep" ? 'selected' : ''}>Sleep</option>
    <option value="Spirituality" ${ spellToEdit.intention == "Spirituality" ? 'selected' : ''}>Spirituality</option>         
    <option value="Wisdom" ${ spellToEdit.intention == "Wisdom" ? 'selected' : ''}>Wisdom</option>    
    `

    $('select').formSelect();

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

