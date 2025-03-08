// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

import { generateArchitecture } from '../src/generators/architectureGenerator';
import { exportToJson } from '../src/exporters/jsonExporter';

describe('JSON Exporter Tests', () => {
    let architecture;

    beforeEach(() => {
        architecture = generateArchitecture();
    });

    test('should export architecture data to JSON format', () => {
        const jsonData = exportToJson(architecture);
        expect(jsonData).toBeDefined();
        expect(typeof jsonData).toBe('string');
        
        const parsedData = JSON.parse(jsonData);
        expect(parsedData).toHaveProperty('name', architecture.name);
        expect(parsedData).toHaveProperty('version', architecture.version);
        expect(parsedData).toHaveProperty('components');
        expect(Array.isArray(parsedData.components)).toBe(true);
    });

    test('should handle empty architecture gracefully', () => {
        const emptyArchitecture = { name: '', version: '', components: [] };
        const jsonData = exportToJson(emptyArchitecture);
        const parsedData = JSON.parse(jsonData);
        
        expect(parsedData).toEqual({
            name: '',
            version: '',
            components: []
        });
    });
});