class Reagent {

    static all = [];
    static editedComponentId = null;

    constructor(id, name, latin, planet, element, description, toxic, synonyms, deities, uses) {
        this.id = id;
        this.name = name;
        this.latin = latin;
        this.planet = planet;
        this.element = element;
        this.description = description;
        this.toxic = toxic
        this.synonyms = synonyms;
        this.deities = deities;
        this.uses = uses;
    }

    display() {
        
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const h5latin = document.createElement('h5');
        const h5planet = document.createElement('h5');
        const h5element = document.createElement('h5');
        const h5synonyms = document.createElement('h5');
        const p = document.createElement('p');
        const usesList = document.createElement('ul')
        const deitiesList = document.createElement('ul')
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        h4.innerText = this.name
        h5latin.innerText = this.latin
        h5planet.innerText = this.planet
        h5element.innerText = this.element
        h5synonyms.innerText = "Synonym Placeholder"
        p.innerText = this.description

        // Add synonym logic here when it's clear what comes back from fetch.

        this.deities.forEach(deity => {
            const deityItem = document.createElement('li')
            deityItem.innerText = deity.name
            deityItem.id = deity.id
            deitiesList.appendChild(deityItem)
        })

        this.uses.forEach(use => {
            const useItem = document.createElement('li')
            useItem.innerText = use.name
            useItem.id = use.id
            usesList.appendChild(useItem)
        })

        editButton.innerText = "Edit"
        editButton.id = this.id
        editButton.addEventListener('click', Reagent.editComponent)

        deleteButton.innerText = "Delete"
        deleteButton.id = this.id
        deleteButton.addEventListener('click', Reagent.deleteComponent)

        div.appendChild(h4)
        div.appendChild(h5latin)
        if (this.toxic == true) {
            const toxicFlag = document.createElement('h5');
            toxicFlag.innerText = "DO NOT CONSUME"
            div.appendChild(toxicFlag)
        }
        div.appendChild(h5planet)
        div.appendChild(h5element)
        div.appendChild(h5synonyms)
        div.appendChild(p)
        div.appendChild(deitiesList)
        div.appendChild(usesList)
        div.appendChild(editButton)
        div.appendChild(deleteButton)

        componentList().appendChild(div)

    }

    static createComponents(componentsData) {
        componentsData.forEach(com => Reagent.create(com.id, com.name, com.latin, com.planet, com.element, com.description, com.toxic, com.synonyms, com.deities, com.uses))
    }
    static create(id, name, latin, planet, element, description, toxic, synonyms, deities, uses) {
        let newComponent = new Reagent(id, name, latin, planet, element, description, toxic, synonyms, deities, uses);

        Reagent.all.push(newComponent);

        return newComponent;
    }

    static displayComponents() {
        componentList().innerHTML = '';
        Reagent.all.forEach(com => {
            com.display()
        })
    }

    static createFromForm(e) {
        
        e.preventDefault();

        if (editingComponent && Reagent.validateForm() == true ) {
            Reagent.updateComponent()
        } else if ( Reagent.validateForm() == true ) {

            const deitiesAttributes = []
            const rawDeities = getSelectValues(componentDeities())
            rawDeities.forEach(deity => {
                let newDeity = {}
                newDeity["name"] = deity
                deitiesAttributes.push(newDeity)
            })

            const usesAttributes = []
            const rawUses = getSelectValues(componentUses())
            rawUses.forEach(use => {
                let newUse = {}
                newUse["name"] = use
                usesAttributes.push(newUse)
            })

            const synonymsAttributes = []
            const rawSynonyms = componentSynonyms().value.split(', ')
            rawSynonyms.forEach(synonym => {
                let newSynonym = {}
                newSynonym["name"] = synonym
                synonymsAttributes.push(newSynonym)
            })

            const strongParams = {
                component: {
                    name: componentName().value,
                    latin: componentLatin().value,
                    planet: componentPlanet().value,
                    element: componentElement().value,
                    description: componentDescription().value,
                    toxic: componentToxic().value,
                    synonyms_attributes: synonymsAttributes,
                    deities_attributes: deitiesAttributes,
                    uses_attributes: usesAttributes
                }
            }
        fetch(baseUrl + '/components.json', {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let createComponent = Reagent.create(data.id, data.name, data.latin, data.planet, data.element, data.description, data.toxic, data.synonyms, data.deities, data.uses);
            createComponent.display();
        })

        resetInputs();
        }
    }

static editComponent() {

    const componentToEdit = Reagent.all.find(component => component.id == this.id)
    
    editingComponent = true
    componentName().value = this.parentNode.querySelector('h4').innerText;
    componentLatin().value = this.parentNode.querySelectorAll('h5')[0].innerText;
    componentPlanet().value = this.parentNode.querySelectorAll('h5')[1].innerText;
    componentElement().value = this.parentNode.querySelectorAll('h5')[2].innerText;
    componentSynonyms().value = this.parentNode.querySelectorAll('h5')[3].innerText;
    componentDescription().value = this.parentNode.querySelector('p').innerText;
    // Add logic for check boxes and select boxes here.
    submitComponent().value = "Update Component";

    const deityOptions = []
 
    componentToEdit.deities.forEach(deity => {
        deityOptions.push(deity.id)
    })

    deityOptions.forEach(deityId => {
        select("component-deities", deityId)
    })
    $('select').formSelect();

    const useOptions = []

    componentToEdit.uses.forEach(use => {
        useOptions.push(use.id)
    })

    useOptions.forEach(useId => {
        select("component-uses", useId)
    })
    $('select').formSelect();

    debugger

    singleSelect("component-planet", componentToEdit.planet)
    singleSelect("component-element", componentToEdit.element)
    singleSelect("component-toxic", componentToEdit.toxic)

    M.updateTextFields();
    Reagent.editedComponentId = this.id
}

static updateComponent() {

    const deitiesAttributes = []
    const rawDeities = getSelectValues(componentDeities())
    rawDeities.forEach(deity => {
        let newDeity = {}
        newDeity["name"] = deity
        deitiesAttributes.push(newDeity)
    })

    const usesAttributes = []
    const rawUses = getSelectValues(componentUses())
    rawUses.forEach(use => {
        let newUse = {}
        newUse["name"] = use
        usesAttributes.push(newUse)
    })

    const synonymsAttributes = []
    const rawSynonyms = componentSynonyms().value.split(', ')
    rawSynonyms.forEach(synonym => {
        let newSynonym = {}
        newSynonym["name"] = synonym
        synonymsAttributes.push(newSynonym)
    })

    const strongParams = {
        component: {
            name: componentName().value,
            latin: componentLatin().value,
            planet: componentPlanet().value,
            element: componentElement().value,
            description: componentDescription().value,
            toxic: componentToxic().value,
            synonyms_attributes: synonymsAttributes,
            deities_attributes: deitiesAttributes,
            uses_attributes: usesAttributes
        }
    }

    fetch(baseUrl + '/components/' + Reagent.editedComponentId, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {
        
        let editedComponent = Reagent.all.find(component => component.id == data.id)
        editedComponent.name = data.name
        editedComponent.latin = data.latin
        editedComponent.planet = data.planet
        editedComponent.element = data.element
        editedComponent.toxic = data.toxic
        editedComponent.synonyms = data.synonyms
        editedComponent.deities = data.deities
        editedComponent.uses = data.uses

        Reagent.displayComponents()

        resetInputs();
        editingComponent = false
        Reagent.editedComponentId = null
        submitComponent().value = "Create Component"
    })
}

static deleteComponent() {
    fetch(baseUrl + '/components/' + this.id, {
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

    if (componentName().value == "") {
        alert("Component needs a name!");
        validationValue = false;
    } 

    if (componentToxic().value == "") {
        alert("Please indicate whether this component is toxic.");
        validationValue = false;
    }

    if (componentElement().value == "") {
        alert("Component needs and element!");
        validationValue = false;
    }

    return validationValue

}

}