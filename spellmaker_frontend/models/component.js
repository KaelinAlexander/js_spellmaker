class Component {

    static all = [];
    static editedComponentId = null;

    constructor(id, name, latin, planet, element, description, synonyms, deities, uses) {
        this.id = id;
        this.name = name;
        this.latin = latin;
        this.planet = planet;
        this.element = element;
        this.description = description;
        this.synonyms = synonyms;
        this.deities = deities;
        this.uses = uses;
    }

    static createComponenets(componentsData) {
        componentsData.forEach(component => Component.create(component.id, component.name, component.latin, component.planet, component.element, component.description, component.synonyms, component.deities, component.uses))
    }

    static create(id, name, latin, planet, element, description, synonyms, deities, uses) {
        let component = new Component(id, name, latin, planet, element, description, synonyms, deities, uses);

        Component.all.push(component);

        return component;
    }
}