const { Architecture } = require('../src/models/architecture');
const { Component } = require('../src/models/components');
const { Relationship } = require('../src/models/relationships');
const { generateArchitecture } = require('../src/generators/architectureGenerator');
const { exportToJson } = require('../src/exporters/jsonExporter');

// Create a new architecture instance
const completeSystemArchitecture = new Architecture('Complete ISA-112 System', '1.0');

// Define components
const component1 = new Component('C1', 'Sensor', 'Active');
const component2 = new Component('C2', 'Controller', 'Active');
const component3 = new Component('C3', 'Actuator', 'Inactive');

// Add components to the architecture
completeSystemArchitecture.addComponent(component1);
completeSystemArchitecture.addComponent(component2);
completeSystemArchitecture.addComponent(component3);

// Define relationships
const relationship1 = new Relationship(component1.id, component2.id, 'senses');
const relationship2 = new Relationship(component2.id, component3.id, 'controls');

// Add relationships to the architecture
completeSystemArchitecture.addRelationship(relationship1);
completeSystemArchitecture.addRelationship(relationship2);

// Generate the architecture data
const architectureData = generateArchitecture(completeSystemArchitecture);

// Export the architecture data to JSON format
const jsonOutput = exportToJson(architectureData);

// Log the JSON output
console.log(jsonOutput);