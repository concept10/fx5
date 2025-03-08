import { config } from '../config.js';

// This file contains utility functions for validating the architecture and component data to ensure correctness before generation.

export function validateArchitecture(architecture) {
  if (!architecture.name) {
    throw new Error('Architecture must have a name');
  }
  if (!architecture.version) {
    throw new Error('Architecture must have a version');
  }
  architecture.components.forEach(validateComponent);
  architecture.relationships.forEach(validateRelationship);
  const componentIds = new Set(architecture.components.map(c => c.id));
  for (const relationship of architecture.relationships) {
    if (!componentIds.has(relationship.from)) {
      throw new Error(`Relationship references non-existent source component: ${relationship.from}`);
    }
    if (!componentIds.has(relationship.to)) {
      throw new Error(`Relationship references non-existent target component: ${relationship.to}`);
    }
  }
}

export function validateComponent(component) {
  if (!component.id) {
    throw new Error('Component must have an ID');
  }
  if (!component.type) {
    throw new Error('Component must have a type');
  }
}

export function validateRelationship(relationship) {
  if (!relationship.from) {
    throw new Error('Relationship must have a source');
  }
  if (!relationship.to) {
    throw new Error('Relationship must have a target');
  }
  if (!relationship.type) {
    throw new Error('Relationship must have a type');
  }
}