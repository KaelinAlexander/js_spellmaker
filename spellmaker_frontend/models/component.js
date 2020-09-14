class Component {

    static all = [];
    static editedComponentId = null;

    constructor(id, name, latin, planet, element, description) {
        this.id = id;
        this.name = name;
        this.latin = latin;
        this.planet = planet;
        this.element = element;
        this.description = description;
    }

    static createComponenets(componentsData) {
        componentsData.forEach(component => Component.create(component.id, component.name, component.latin, component.planet, component.element, component.description))
    }

    static create(id, name, latin, planet, element, description) {
        let component = new Component(id, name, latin, planet, element, description);

        Component.all.push(component);

        return component;
    }
}