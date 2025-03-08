
// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

function generateISA112Architecture() {
    const Architecture = require('../models/architecture');
    const Component = require('../models/components');
    const Relationship = require('../models/relationships');

    const architecture = new Architecture('ISA-112 Architecture', '1.0');

    // Define components
    const component1 = new Component('C1', 'Sensor', 'active');
    const component2 = new Component('C2', 'Controller', 'active');
    const component3 = new Component('C3', 'Actuator', 'inactive');

    // Add components to architecture
    architecture.addComponent(component1);
    architecture.addComponent(component2);
    architecture.addComponent(component3);

    // Define relationships
    const relationship1 = new Relationship(component1.id, component2.id, 'senses');
    const relationship2 = new Relationship(component2.id, component3.id, 'controls');

    // Add relationships to architecture
    architecture.addRelationship(relationship1);
    architecture.addRelationship(relationship2);

    return architecture.getArchitectureData();
}

module.exports = generateISA112Architecture;