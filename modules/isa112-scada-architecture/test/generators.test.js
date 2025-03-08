// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

import { generateArchitecture } from '../src/generators/architectureGenerator';
import { Architecture } from '../src/models/architecture';
import { Component } from '../src/models/components';
import { Relationship } from '../src/models/relationships';

describe('Architecture Generator', () => {
    let architecture;

    beforeEach(() => {
        architecture = generateArchitecture();
    });

    test('should generate an architecture with a name and version', () => {
        expect(architecture.name).toBeDefined();
        expect(architecture.version).toBeDefined();
    });

    test('should have components defined', () => {
        expect(architecture.components).toBeInstanceOf(Array);
        expect(architecture.components.length).toBeGreaterThan(0);
    });

    test('should generate components with valid properties', () => {
        architecture.components.forEach(component => {
            expect(component.id).toBeDefined();
            expect(component.type).toBeDefined();
            expect(component.status).toBeDefined();
        });
    });

    test('should establish relationships between components', () => {
        const relationships = architecture.relationships || [];
        expect(relationships.length).toBeGreaterThan(0);
        relationships.forEach(relationship => {
            expect(relationship.source).toBeDefined();
            expect(relationship.target).toBeDefined();
        });
    });
});