class Component {

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
        const h5synonyms = document.createElement('h5');
        const h5planet = document.createElement('h5');
        const h5element = document.createElement('h5');
        const p = document.createElement('p');
        const usesList = document.createElement('ul')
        const deitiesList = document.createElement('ul')
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        h4.innerText = this.name
        h5latin.innerText = this.latin
        h5planet.innerText = this.planet
        h5element.innerText = this.element
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

        div.appendChild(h4)
        div.appendChild(h5latin)
        if (this.toxic == true) {
            const toxicFlag = document.createElement('h5');
            toxicFlag.innerText = "DO NOT CONSUME"
            div.appendChild(toxicFlag)
        }
        div.appendChild(h5planet)
        div.appendChild(h5element)
        div.appendChild(deitiesList)
        div.appendChild(usesList)

        componentList().appendChild(div)

    }

    static createComponenets(componentsData) {
        componentsData.forEach(component => Component.create(component.id, component.name, component.latin, component.planet, component.element, component.description, component.toxic, component.synonyms, component.deities, component.uses))
    }

    static create(id, name, latin, planet, element, description, toxic, synonyms, deities, uses) {
        let component = new Component(id, name, latin, planet, element, description, toxic, synonyms, deities, uses);

        Component.all.push(component);

        return component;
    }

    static displayComponents() {
        componentList().innerHTML = '';
        Component.all.forEach(component => {
            component.display()
        })
    }

    static createFromForm(e) {
        e.preventDefault();

        if (editingComponent) {

        } else {
            const strongParams = {
                component: {
                    name:
                }
            }
        }
    }

}