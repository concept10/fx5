// This file contains utility functions for validating the architecture and component data to ensure correctness before generation.

function validateArchitecture(architecture) {
    if (!architecture.name || typeof architecture.name !== 'string') {
        throw new Error('Invalid architecture name');
    }
    if (!architecture.version || typeof architecture.version !== 'string') {
        throw new Error('Invalid architecture version');
    }
    if (!Array.isArray(architecture.components)) {
        throw new Error('Components should be an array');
    }
    architecture.components.forEach(component => validateComponent(component));
}

function validateComponent(component) {
    if (!component.id || typeof component.id !== 'string') {
        throw new Error('Invalid component id');
    }
    if (!component.type || typeof component.type !== 'string') {
        throw new Error('Invalid component type');
    }
    if (typeof component.status !== 'string') {
        throw new Error('Invalid component status');
    }
}

export { validateArchitecture, validateComponent };