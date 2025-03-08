<!-- SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC -->
<!-- SPDX-License-Identifier: MIT -->

# FX5 Documentation Structure

```
/documentation/
|-- index.md                     # Main documentation index
|-- standards-isa-all.md         # Complete ISA Standards List
|-- modules/                     # Module documentation
|   |-- arch.md                  # Architecture components
|   |-- io.md                    # I/O interfaces
|   |-- comm.md                  # Communication protocols
|   |-- security.md              # Security implementation
|   |-- hmi.md                   # HMI components
|   |-- scada.md                 # SCADA implementation
|   |-- alarm.md                 # Alarm management
|   `-- safety.md                # Safety systems
|-- function_blocks/             # Function block documentation
|   |-- fb_pid.md                # PID controller
|   |-- fb_ffc.md                # Feed-forward control
|   |-- fb_cascade.md            # Cascade control
|   |-- fb_ratio.md              # Ratio control
|   |-- fb_ai.md                 # Analog input
|   |-- fb_ao.md                 # Analog output
|   |-- fb_di.md                 # Digital input
|   |-- fb_do.md                 # Digital output
|   |-- fb_pi.md                 # Pulse input
|   |-- fb_filter.md             # Signal filtering
|   |-- fb_scale.md              # Signal scaling
|   |-- fb_limit.md              # Limit checking
|   |-- fb_rate.md               # Rate of change
|   |-- fb_alarm_basic.md        # Basic alarm
|   |-- fb_alarm_advanced.md     # Advanced alarm
|   `-- fb_alarm_group.md        # Alarm grouping
|-- standards/                   # Standards reference
|   |-- isa-112.md               # ISA-112 SCADA Architecture
|   |-- isa-5-1.md               # ISA-5.1 Instrumentation Symbols
|   `-- isa-18-2.md              # ISA-18.2 Alarm Management
|-- tools/                       # Tools documentation
|   |-- io-list-generator.md     # I/O List Generator
|   |-- isa112-architecture-generator.md # ISA-112 Architecture Generator
|   `-- fb-diagram-editor.md     # Function Block Diagram Editor
|-- tutorials/                   # Tutorials
|   |-- getting-started.md       # Getting Started
|   |-- custom-function-blocks.md # Creating Custom Function Blocks
|   `-- implementing-isa-112.md  # Implementing ISA-112 SCADA Architecture
`-- api/                         # API Documentation
    |-- core.md                  # Core API Reference
    |-- function-blocks.md       # Function Block API
    `-- module-integration.md    # Module Integration API
```
