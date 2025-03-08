// This file contains unit tests for the models, ensuring that the Architecture, Component, and Relationship classes function as expected.

const Architecture = require('../src/models/architecture');
const Component = require('../src/models/components');
const Relationship = require('../src/models/relationships');

describe('Architecture Model', () => {
    let architecture;

    beforeEach(() => {
        architecture = new Architecture('ISA-112 Architecture', '1.0');
    });

    test('should create an architecture with a name and version', () => {
        expect(architecture.name).toBe('ISA-112 Architecture');
        expect(architecture.version).toBe('1.0');
    });

    test('should add components to the architecture', () => {
        const component = new Component('1', 'Sensor', 'active');
        architecture.addComponent(component);
        expect(architecture.components.length).toBe(1);
        expect(architecture.components[0]).toBe(component);
    });

    test('should retrieve architecture data', () => {
        const component = new Component('1', 'Sensor', 'active');
        architecture.addComponent(component);
        const data = architecture.getArchitectureData();
        expect(data.name).toBe('ISA-112 Architecture');
        expect(data.version).toBe('1.0');
        expect(data.components.length).toBe(1);
    });
});

describe('Component Model', () => {
    let component;

    beforeEach(() => {
        component = new Component('1', 'Sensor', 'active');
    });

    test('should create a component with id, type, and status', () => {
        expect(component.id).toBe('1');
        expect(component.type).toBe('Sensor');
        expect(component.status).toBe('active');
    });

    test('should get component details', () => {
        const details = component.getComponentDetails();
        expect(details.id).toBe('1');
        expect(details.type).toBe('Sensor');
        expect(details.status).toBe('active');
    });
});

describe('Relationship Model', () => {
    let relationship;

    beforeEach(() => {
        relationship = new Relationship('1', 'Sensor', 'Controller');
    });

    test('should create a relationship with source and target', () => {
        expect(relationship.source).toBe('Sensor');
        expect(relationship.target).toBe('Controller');
    });

    test('should retrieve relationship data', () => {
        const data = relationship.getRelationshipData();
        expect(data.source).toBe('Sensor');
        expect(data.target).toBe('Controller');
    });
});