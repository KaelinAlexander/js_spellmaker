const spellList = () => document.getElementById("spell-list")
const componentList = () => document.getElementById("component-list")

const spellForm = () => document.querySelector("form#spell-form")
const spellName = () => document.querySelector("input#spell-name")
const spellProcess = () => document.querySelector("select#spell-process")
const spellIntention = () => document.querySelector("select#spell-intention")
const spellDescription = () => document.querySelector("textarea#spell-description")
const submitSpell = () => document.getElementById("submit-spell")

const componentForm = () => document.querySelector("form#component-form")
const componentName = () => document.querySelector("input#component-name")
const componentLatin = () => document.querySelector("input#component-latin")
const componentSynonyms = () => document.querySelector("input#component-synonyms")
const componentPlanet = () => document.querySelector("select#component-planet")
const componentElement = () => document.querySelector("select#component-element")
const componentDescription = () => document.querySelector("textarea#component-description")
const componentToxic = () => document.querySelector("select#component-toxic")
const componentDeities = () => document.querySelector("select#component-deities")
const componentUses = () => document.querySelector("select#component-uses")
const submitComponent = () => document.getElementById("submit-component")

const baseUrl = 'http://localhost:3000'
let editingSpell = false
let editingComponent = false

document.addEventListener("DOMContentLoaded", callOnLoad)

function callOnLoad() {
    loadSpells();
    loadComponents();
    submitSpell().addEventListener('click', Spell.createFromForm);
    submitComponent().addEventListener('click', Reagent.createFromForm);
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

function loadComponents() {
    fetch(baseUrl + '/components.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            Reagent.createComponents(data);
            Reagent.displayComponents();
        })
        .catch(errors => console.log(errors))
}

// function loadSelectors() {

// }

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

function resetInputs() {
    spellForm().reset();
    componentForm().reset();    
}