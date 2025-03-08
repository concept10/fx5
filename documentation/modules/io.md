<!-- SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC -->
<!-- SPDX-License-Identifier: MIT -->

# Input/Output Interfaces Module

## Overview

The Input/Output (`io`) module provides standardized interfaces and handlers for industrial I/O signals according to ISA standards. It supports various signal types including analog, digital, and pulse inputs/outputs.

## Features

- Support for all ISA standard signal types (AI, AO, DI, DO, PI, etc.)
- Signal validation and conditioning
- Engineering unit conversion
- Alarming and limit detection
- I/O diagnostics and fault detection
- Redundancy handling

## Signal Types

| Type | Description | Range | Example Instruments |
|------|-------------|-------|---------------------|
| AI | Analog Input | 4-20mA, 0-10V | Temperature sensors, pressure transmitters |
| AO | Analog Output | 4-20mA, 0-10V | Control valves, variable speed drives |
| DI | Digital Input | 0/24V, dry contact | Limit switches, pushbuttons |
| DO | Digital Output | 24V, relay | Solenoids, indicator lights |
| PI | Pulse Input | Frequency, counter | Flow meters, encoders |
| PO | Pulse Output | PWM, frequency | Stepper motors, dosing pumps |

## Implementation Classes

### IO Point Base Class

The `IOPoint` base class provides common functionality for all I/O points:

- Signal validation
- Engineering unit conversion
- Value clamping and limiting
- Quality status tracking
- Timestamps for value changes

### Type-Specific Implementations

Specialized classes extend the base functionality:

- `AnalogInput`: For continuous process variables
- `AnalogOutput`: For continuous control outputs
- `DigitalInput`: For discrete status monitoring
- `DigitalOutput`: For discrete control actions
- `PulseInput`: For counting and frequency measurement
- `AnalogGroup`: For handling related analog signals
- `DigitalGroup`: For handling related digital signals

## Usage

```javascript
const { AnalogInput, DigitalOutput } = require('fx5/modules/io');

// Create an analog input for a temperature sensor
const temperatureSensor = new AnalogInput({
  tagName: 'TT101',
  description: 'Reactor Temperature',
  rangeMin: 0,
  rangeMax: 100,
  engineeringUnits: '°C',
  alarmHighHigh: 95,
  alarmHigh: 85,
  alarmLow: 15,
  alarmLowLow: 5
});

// Read the raw value and get scaled value with quality
temperatureSensor.readRawValue(12.3); // mA value
const { value, quality, timestamp } = temperatureSensor.getValue();
console.log(`Temperature: ${value}°C, Quality: ${quality}`);

// Create a digital output for a pump
const pumpControl = new DigitalOutput({
  tagName: 'P101',
  description: 'Feed Pump',
  normalState: 'OFF',
  interlocks: ['Tank_Level_High', 'Pressure_Low']
});

// Control the output
pumpControl.setValue(true);  // Turn on the pump
```

## Integration with Hardware

The IO module supports integration with various hardware platforms:

- OPC UA servers
- Modbus TCP/RTU devices
- PROFINET/PROFIBUS networks
- EtherNet/IP devices
- Custom hardware through adapters

## Related Modules

- [`arch`](./arch.md): System architecture components
- [`alarm`](./alarm.md): Advanced alarm management
- [`safety`](./safety.md): Safety instrumented systems
