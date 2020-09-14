const spellList = () => document.getElementById("spell-list")
const spellForm = () => document.getElementById("spell-form")
const spellName = () => document.querySelector("input#spell-name")
const spellProcess = () => document.querySelector("input#spell-process")
const spellIntention = () => document.querySelector("input#spell-intention")
const spellDescription = () => document.querySelector("textarea#spell-description")
const submitButton = () => document.getElementById("submit-spell")

const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", callOnLoad)

function callOnLoad() {
    loadSpells();
    // spellForm().addEventListener('submit', createSpell)
}

function loadSpells() {
    fetch(baseUrl + '/spells.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            Spell.createSpells(data)
            Spell.displaySpells();
        })
        .catch(errors => console.log(errors))
}