class Architecture {
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.components = [];
    }

    addComponent(component) {
        this.components.push(component);
    }

    getArchitectureData() {
        return {
            name: this.name,
            version: this.version,
            components: this.components.map(component => component.getComponentDetails())
        };
    }
}

export default Architecture;