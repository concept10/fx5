<!-- SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC -->
<!-- SPDX-License-Identifier: MIT -->

# PID Controller Function Block

## Overview

The `fb_pid` function block implements a standard Proportional-Integral-Derivative controller following ISA-5.1 instrumentation standards. It provides a comprehensive PID algorithm with multiple operating modes, anti-windup protection, and bumpless transfer.

## Block Diagram

```
    +-------+
    |       |    +------------+
SP  |       |    |            |
--->| Error |--->|            |
    |  Calc |    |            |     +--------+
    |       |    |    PID     |---->| Output |---> CV
    +-------+    | Algorithm  |     | Limit  |
                 |            |     |        |
PV  |            |            |     |        |
--->|            |            |     |        |
    +------------+            |     +--------+
                              |
                              |
         Mode, Tuning --------+
         Parameters
```

## Parameters

### Input Parameters

| Parameter | Data Type | Description | Range |
|-----------|-----------|-------------|-------|
| `i_rSP` | REAL | Setpoint | Engineering Units |
| `i_rPV` | REAL | Process Variable | Engineering Units |
| `i_rManValue` | REAL | Manual Output Value | 0-100% |
| `i_bManMode` | BOOL | Manual Mode | TRUE/FALSE |
| `i_bTrackMode` | BOOL | Track Mode | TRUE/FALSE |
| `i_rTrackValue` | REAL | Track Value | 0-100% |
| `i_bHoldOutput` | BOOL | Hold Output | TRUE/FALSE |

### Configuration Parameters

| Parameter | Data Type | Description | Default |
|-----------|-----------|-------------|---------|
| `i_rKp` | REAL | Proportional Gain | 1.0 |
| `i_rTi` | REAL | Integral Time (s) | 60.0 |
| `i_rTd` | REAL | Derivative Time (s) | 0.0 |
| `i_rDeadBand` | REAL | Error Dead Band | 0.0 |
| `i_bDirectAction` | BOOL | Direct Acting | FALSE |
| `i_rCVHiLimit` | REAL | Output High Limit | 100.0 |
| `i_rCVLoLimit` | REAL | Output Low Limit | 0.0 |
| `i_rCVRoC` | REAL | Rate of Change Limit (%/s) | 10.0 |

### Output Parameters

| Parameter | Data Type | Description |
|-----------|-----------|-------------|
| `o_rCV` | REAL | Control Value Output (0-100%) |
| `o_rError` | REAL | Control Error (SP-PV) |
| `o_bHiLimit` | BOOL | At High Limit |
| `o_bLoLimit` | BOOL | At Low Limit |
| `o_bWindup` | BOOL | Integral Windup Active |
| `o_bManMode` | BOOL | In Manual Mode |
| `o_rPTerm` | REAL | Proportional Term |
| `o_rITerm` | REAL | Integral Term |
| `o_rDTerm` | REAL | Derivative Term |

## Functionality

### Control Algorithm

The PID controller implements the standard ISA algorithm:

```
CV = Kp * (e(t) + 1/Ti * ∫e(t)dt + Td * de(t)/dt)

where:
e(t) = SP - PV (reverse acting) or PV - SP (direct acting)
```

### Operating Modes

- **Automatic Mode**: The controller calculates output based on SP, PV and tuning parameters
- **Manual Mode**: Operator directly sets the output value
- **Track Mode**: Output follows the track value input
- **Hold Mode**: Output is frozen at current value

### Anti-Windup Protection

The function block implements multiple anti-windup strategies:

1. External feedback windup protection
2. Conditional integration
3. Back-calculation method

### Bumpless Transfer

Seamless switching between controller modes is ensured through:

1. Initialization of integral term during mode changes
2. Tracking of manual to auto transitions
3. Rate limiting of output changes

## Usage Example

```text
// SCL Implementation Example
FUNCTION_BLOCK FB_PID_Controller

VAR_INPUT
    i_rSP          : REAL;    // Setpoint
    i_rPV          : REAL;    // Process Variable
    i_rManValue    : REAL;    // Manual Value
    i_bManMode     : BOOL;    // Manual Mode
    i_rKp          : REAL;    // Proportional Gain
    i_rTi          : REAL;    // Integral Time
    i_rTd          : REAL;    // Derivative Time
END_VAR

VAR_OUTPUT
    o_rCV          : REAL;    // Control Value
    o_rError       : REAL;    // Control Error
    o_bHiLimit     : BOOL;    // At High Limit
END_VAR

VAR
    rIntegral      : REAL;    // Integral Term
    rLastError     : REAL;    // Previous Error
END_VAR

BEGIN
    // Calculate error
    o_rError := i_rSP - i_rPV;
    
    // Check if in manual mode
    IF i_bManMode THEN
        o_rCV := i_rManValue;
        rIntegral := i_rManValue / i_rKp; // Initialize for bumpless transfer
    ELSE
        // PID calculation implementation
        // ...
    END_IF;
    
    // Store last error for derivative calculation
    rLastError := o_rError;
END_FUNCTION_BLOCK
```

## Tuning Guidelines

For optimal performance:

1. Start with P-only control (Ti=0, Td=0)
2. Increase Kp until stable oscillations occur, then reduce by 50%
3. Set Ti to approximately the period of oscillations
4. Introduce Td cautiously, typically 1/4 to 1/8 of Ti

## Related Function Blocks

- [`fb_cascade`](./fb_cascade.md): Cascade control
- [`fb_ffc`](./fb_ffc.md): Feed-forward control
- [`fb_ratio`](./fb_ratio.md): Ratio control
