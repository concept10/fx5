// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

// src/generators/templateBuilder.js

export function buildArchitectureTemplate(name, version) {
    return {
        name: name,
        version: version,
        components: []
    };
}

export function buildComponentTemplate(id, type, status) {
    return {
        id: id,
        type: type,
        status: status
    };
}

export function buildRelationshipTemplate(sourceId, targetId, type) {
    return {
        source: sourceId,
        target: targetId,
        type: type
    };
}