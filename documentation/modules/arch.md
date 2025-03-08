<!-- SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC -->
<!-- SPDX-License-Identifier: MIT -->

# Architecture Components Module

## Overview

The Architecture (`arch`) module provides the core structural components for building industrial automation systems according to ISA standards. It implements reference models and patterns for organizing control system architectures.

## Features

- ISA-95 compatible enterprise-control system integration
- ISA-112 SCADA architectural patterns
- Component-based architecture for reusable design
- Standardized interfaces for system integration
- Hierarchical structure for multi-level control systems

## Components

### Reference Architecture

The reference architecture follows ISA-112 guidelines, organizing components into:

- Level 0: Field Devices
- Level 1: Control Systems
- Level 2: Supervisory Systems
- Level 3: Site Operations
- Level 4: Enterprise Systems

### System Boundary Objects

These components define the interfaces between different system levels:

| Component | Purpose | Standard |
|-----------|---------|----------|
| `FieldGateway` | Interface between field devices and control systems | ISA-112 |
| `ControlGateway` | Interface between control and supervisory systems | ISA-112 |
| `EnterpriseGateway` | Interface between operations and enterprise systems | ISA-95 |

### Architecture Models

The module includes several architecture models:

- **Centralized Model**: Traditional centralized SCADA architecture
- **Distributed Model**: Distributed control with coordinated supervisory components
- **Federated Model**: Loosely coupled systems with standardized interfaces

## Usage

```javascript
const { Architecture, Component, Relationship } = require('fx5/modules/arch');

// Create a new architecture
const scadaArch = new Architecture({
  name: 'Water Treatment SCADA',
  version: '1.0',
  standard: 'ISA-112'
});

// Add components
scadaArch.addComponent(new Component('RTU-1', 'RemoteTerminalUnit'));
scadaArch.addComponent(new Component('HMI-1', 'HumanMachineInterface'));

// Establish relationships
scadaArch.addRelationship(new Relationship('RTU-1', 'HMI-1', 'data_source'));

// Export the architecture
const jsonData = scadaArch.toJSON();
```

## Configuration

The architecture module supports configuration through:

- JSON configuration files
- Programmatic API
- Standard templates

## Related Modules

- [`scada`](./scada.md): SCADA implementation using architecture components
- [`comm`](./comm.md): Communication protocols for component integration
- [`security`](./security.md): Security implementation following ISA-62443
