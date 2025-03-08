// This file provides an example of a basic ISA-112 architecture generation and export to JSON.

import { Architecture } from '../src/models/architecture.js';
import { Component } from '../src/models/components.js';
import { Relationship } from '../src/models/relationships.js';
import { jsonExporter } from '../src/exporters/jsonExporter.js';

// Create a new architecture instance
const basicArchitecture = new Architecture('Basic ISA-112 Architecture', '1.0');

// Define components
const component1 = new Component('C1', 'Sensor', 'Active');
const component2 = new Component('C2', 'Controller', 'Active');
const component3 = new Component('C3', 'Actuator', 'Inactive');

// Add components to the architecture
basicArchitecture.addComponent(component1);
basicArchitecture.addComponent(component2);
basicArchitecture.addComponent(component3);

// Define relationships
const relationship1 = new Relationship(component1.id, component2.id, 'senses');
const relationship2 = new Relationship(component2.id, component3.id, 'controls');

// Add relationships to the architecture
basicArchitecture.addRelationship(relationship1);
basicArchitecture.addRelationship(relationship2);

// Export the architecture data to JSON format
const architectureJson = jsonExporter(basicArchitecture);

// Log the JSON output
console.log(JSON.stringify(architectureJson, null, 2));