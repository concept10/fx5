<!-- SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC -->
<!-- SPDX-License-Identifier: MIT -->

# FX5 Documentation Index

## Core Modules

| Module | Description | Status |
|--------|-------------|--------|
| [`arch`](./modules/arch.md) | System architecture components | Active |
| [`io`](./modules/io.md) | Input/Output interfaces and handlers | Active |
| [`comm`](./modules/comm.md) | Communication protocols | Active |
| [`security`](./modules/security.md) | Security implementation (ISA-62443) | Active |
| [`hmi`](./modules/hmi.md) | Human-Machine Interface components (ISA-101) | Active |
| [`scada`](./modules/scada.md) | SCADA implementation (ISA-112) | Active |
| [`alarm`](./modules/alarm.md) | Alarm management (ISA-18.2) | Active |
| [`safety`](./modules/safety.md) | Safety instrumented systems (ISA-84) | Active |

## Function Blocks

### Control Function Blocks (fb_control)

| Block | Description | Standard |
|-------|-------------|----------|
| [`fb_pid`](./function_blocks/fb_pid.md) | PID controller | ISA-5.1 |
| [`fb_ffc`](./function_blocks/fb_ffc.md) | Feed-forward control | ISA-5.1 |
| [`fb_cascade`](./function_blocks/fb_cascade.md) | Cascade control | ISA-5.1 |
| [`fb_ratio`](./function_blocks/fb_ratio.md) | Ratio control | ISA-5.1 |

### Input/Output Function Blocks (fb_io)

| Block | Description | Type |
|-------|-------------|------|
| [`fb_ai`](./function_blocks/fb_ai.md) | Analog input | AI |
| [`fb_ao`](./function_blocks/fb_ao.md) | Analog output | AO |
| [`fb_di`](./function_blocks/fb_di.md) | Digital input | DI |
| [`fb_do`](./function_blocks/fb_do.md) | Digital output | DO |
| [`fb_pi`](./function_blocks/fb_pi.md) | Pulse input | PI |

### Signal Processing Function Blocks (fb_signal)

| Block | Description | Application |
|-------|-------------|-------------|
| [`fb_filter`](./function_blocks/fb_filter.md) | Signal filtering | Noise reduction |
| [`fb_scale`](./function_blocks/fb_scale.md) | Signal scaling | Engineering units |
| [`fb_limit`](./function_blocks/fb_limit.md) | Limit checking | Range validation |
| [`fb_rate`](./function_blocks/fb_rate.md) | Rate of change | Derivatives |

### Alarm Function Blocks (fb_alarm)

| Block | Description | ISA Standard |
|-------|-------------|-------------|
| [`fb_alarm_basic`](./function_blocks/fb_alarm_basic.md) | Basic alarm | ISA-18.2 |
| [`fb_alarm_advanced`](./function_blocks/fb_alarm_advanced.md) | Advanced alarm | ISA-18.2 |
| [`fb_alarm_group`](./function_blocks/fb_alarm_group.md) | Alarm grouping | ISA-18.2 |

## Standards Reference

- [Complete ISA Standards List](./standards-isa-all.md)
- [ISA-112 SCADA Architecture](./standards/isa-112.md)
- [ISA-5.1 Instrumentation Symbols](./standards/isa-5-1.md)
- [ISA-18.2 Alarm Management](./standards/isa-18-2.md)

## Tools and Utilities

- [I/O List Generator](./tools/io-list-generator.md)
- [ISA-112 Architecture Generator](./tools/isa112-architecture-generator.md)
- [Function Block Diagram Editor](./tools/fb-diagram-editor.md)

## Tutorials

- [Getting Started with FX5](./tutorials/getting-started.md)
- [Creating Custom Function Blocks](./tutorials/custom-function-blocks.md)
- [Implementing ISA-112 SCADA Architecture](./tutorials/implementing-isa-112.md)

## API Documentation

- [Core API Reference](./api/core.md)
- [Function Block API](./api/function-blocks.md)
- [Module Integration API](./api/module-integration.md)
