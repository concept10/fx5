/**
 * ISA Signal Types and Definitions
 * Based on ISA standards for process control
 */

// Standard ISA signal types
const ISA_SIGNAL_TYPES = {
  AI: { id: 'AI', name: 'Analog Input', description: 'Continuous signal input (e.g., 4-20mA, 0-10V)' },
  AO: { id: 'AO', name: 'Analog Output', description: 'Continuous signal output to field devices' },
  DI: { id: 'DI', name: 'Digital Input', description: 'Discrete on/off input signal' },
  DO: { id: 'DO', name: 'Digital Output', description: 'Discrete on/off output signal' },
  PI: { id: 'PI', name: 'Pulse Input', description: 'Frequency or pulse counting input' },
  PO: { id: 'PO', name: 'Pulse Output', description: 'Frequency or pulse output' },
  SI: { id: 'SI', name: 'Serial Input', description: 'Serial communication input' },
  SO: { id: 'SO', name: 'Serial Output', description: 'Serial communication output' },
};

// ISA measurement parameters
const ISA_PARAMETERS = {
  T: { id: 'T', name: 'Temperature' },
  P: { id: 'P', name: 'Pressure' },
  F: { id: 'F', name: 'Flow' },
  L: { id: 'L', name: 'Level' },
  A: { id: 'A', name: 'Analysis' },
  S: { id: 'S', name: 'Speed' },
  V: { id: 'V', name: 'Vibration' },
  W: { id: 'W', name: 'Weight' },
  // Add other parameters as needed
};

// IO point structure
const IO_POINT_TEMPLATE = {
  tagNumber: '',
  signalType: '',
  description: '',
  units: '',
  rangeMin: null,
  rangeMax: null,
  hardwareAddress: '',
  notes: '',
  alarmLow: null,
  alarmHigh: null,
};

module.exports = {
  ISA_SIGNAL_TYPES,
  ISA_PARAMETERS,
  IO_POINT_TEMPLATE
};