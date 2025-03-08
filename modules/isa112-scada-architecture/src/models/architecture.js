// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

export class Architecture {
  #components = new Map();
  #relationships = new Map();

  constructor({ name, version, metadata = {} }) {
    this.name = name;
    this.version = version;
    this.metadata = {
      created: new Date().toISOString(),
      standard: 'ISA-112',
      ...metadata
    };
  }

  addComponent(component) {
    this.#components.set(component.id, component);
    return this;
  }

  getComponent(id) {
    return this.#components.get(id);
  }

  addRelationship(relationship) {
    const { from, to } = relationship;
    if (!this.#components.has(from)) {
      throw new Error(`Source component ${from} not found`);
    }
    if (!this.#components.has(to)) {
      throw new Error(`Target component ${to} not found`);
    }
    this.#relationships.set(`${from}-${to}`, relationship);
    return this;
  }

  get components() {
    return [...this.#components.values()];
  }

  get relationships() {
    return [...this.#relationships.values()];
  }

  toJSON() {
    return {
      name: this.name,
      version: this.version,
      metadata: this.metadata,
      components: this.components.map(component => component.toJSON()),
      relationships: this.relationships.map(relationship => relationship.toJSON()),
    };
  }
}