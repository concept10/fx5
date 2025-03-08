class Relationship {
    constructor() {
        this.relationships = [];
    }

    addRelationship(componentA, componentB, type) {
        const relationship = {
            componentA,
            componentB,
            type
        };
        this.relationships.push(relationship);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default Relationship;