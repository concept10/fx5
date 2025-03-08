// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

export function formatArchitectureData(architecture) {
    return {
        name: architecture.name,
        version: architecture.version,
        components: architecture.components.map(component => ({
            id: component.id,
            type: component.type,
            status: component.status
        })),
        relationships: architecture.relationships.map(relationship => ({
            from: relationship.from,
            to: relationship.to,
            type: relationship.type
        }))
    };
}

export function formatComponentData(component) {
    return {
        id: component.id,
        type: component.type,
        status: component.status
    };
}

export function formatRelationshipData(relationship) {
    return {
        from: relationship.from,
        to: relationship.to,
        type: relationship.type
    };
}