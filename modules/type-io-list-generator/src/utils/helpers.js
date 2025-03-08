// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

/**
 * Helper functions for ISA Type I/O List Generator
 * @see https://github.com/concept10/type-io-list-generator
 */

function validateInput(input) {
    // Check if the input is valid (e.g., not null, not empty)
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid input: Input must be a non-empty string.');
    }
    return true;
}

function formatIOList(ioList) {
    // Format the IO list for display or further processing
    return ioList.map(item => `IO Item: ${item}`).join('\n');
}

function generateUniqueId() {
    // Generate a unique identifier for each IO item
    return `id_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a standardized ISA tag number
 * @param {string} signalType - The type of signal (AI, AO, DI, DO, etc.)
 * @param {number} index - Sequential index for unique identification
 * @returns {string} Formatted tag number
 */
function generateTagNumber(signalType, index) {
  const prefix = signalType || 'X';
  const number = (index + 1).toString().padStart(4, '0');
  return `${prefix}${number}`;
}

/**
 * Validate an I/O point for required fields and data consistency
 * @param {Object} point - The I/O point to validate
 * @throws {Error} If validation fails
 */
function validateIOPoint(point) {
  // Required fields
  if (!point.tagNumber) {
    throw new Error('Tag number is required for each I/O point');
  }
  
  if (!point.signalType) {
    throw new Error('Signal type is required for each I/O point');
  }
  
  // Range validation for analog signals
  if (point.signalType.startsWith('A')) {
    if (point.rangeMin === null || point.rangeMax === null) {
      throw new Error(`Analog point ${point.tagNumber} must have min and max range values`);
    }
    
    if (point.rangeMin >= point.rangeMax) {
      throw new Error(`Analog point ${point.tagNumber} has invalid range (min >= max)`);
    }
  }
  
  return true;
}

/**
 * Export IO list to specific controller format
 * @param {Array} points - Array of I/O points
 * @param {string} controllerType - Type of controller (PLC, DCS, etc.)
 * @returns {Object} Controller-specific export data
 */
function exportToControllerFormat(points, controllerType) {
  // Implementation would depend on specific controller requirements
  return {
    controllerType,
    pointCount: points.length,
    exportData: points.map(point => ({
      address: point.hardwareAddress,
      tag: point.tagNumber,
      description: point.description
    }))
  };
}

module.exports = {
  generateTagNumber,
  validateIOPoint,
  exportToControllerFormat
};