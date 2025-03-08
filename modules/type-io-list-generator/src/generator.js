// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

/**
 * Generator for ISA Type I/O Lists
 * @see https://github.com/concept10/type-io-list-generator
 */

const fs = require('fs');
const path = require('path');
const { IO_POINT_TEMPLATE, ISA_SIGNAL_TYPES } = require('./types');
const { generateTagNumber, validateIOPoint } = require('./utils/helpers');

/**
 * Generate a complete I/O list based on configuration
 * @param {Object} config - Configuration object for the I/O list
 * @returns {Object} Result object with generated list and metadata
 */
function generateIOList(config) {
  const ioList = {
    metadata: {
      projectName: config.projectName || 'Unnamed Project',
      revision: config.revision || '1.0',
      date: config.date || new Date().toISOString().split('T')[0],
      generatedBy: 'ISA Type IO List Generator',
    },
    items: []
  };
  
  // Generate example I/O points (in real usage, this would be populated from user input or imported data)
  const examplePoints = generateExamplePoints(10);
  ioList.items = examplePoints;
  
  // Save to file
  const outputPath = saveIOList(ioList, config.outputFormat || 'json');
  
  return {
    items: ioList.items,
    metadata: ioList.metadata,
    outputPath
  };
}

/**
 * Generate example I/O points for demonstration
 * @param {number} count - Number of points to generate
 * @returns {Array} Array of I/O points
 */
function generateExamplePoints(count) {
  const points = [];
  const signalTypes = Object.keys(ISA_SIGNAL_TYPES);
  
  for (let i = 0; i < count; i++) {
    const signalType = signalTypes[i % signalTypes.length];
    const tagNumber = generateTagNumber(signalType, i);
    
    const point = {
      ...IO_POINT_TEMPLATE,
      tagNumber,
      signalType,
      description: `Example ${ISA_SIGNAL_TYPES[signalType].name} point ${i + 1}`,
      units: signalType.startsWith('A') ? 'mA' : '',
      rangeMin: signalType.startsWith('A') ? 4 : 0,
      rangeMax: signalType.startsWith('A') ? 20 : 1,
      hardwareAddress: `${signalType}${i.toString().padStart(3, '0')}`,
      notes: 'Automatically generated',
    };
    
    validateIOPoint(point);
    points.push(point);
  }
  
  return points;
}

/**
 * Save the I/O list to a file in the specified format
 * @param {Object} ioList - The I/O list to save
 * @param {string} format - Output format ('json', 'csv', 'excel')
 * @returns {string} Path to the saved file
 */
function saveIOList(ioList, format) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(process.cwd(), 'output');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let outputPath;
  
  switch (format.toLowerCase()) {
    case 'json':
      outputPath = path.join(outputDir, `io-list-${timestamp}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(ioList, null, 2), 'utf8');
      break;
      
    case 'csv':
      outputPath = path.join(outputDir, `io-list-${timestamp}.csv`);
      const csvContent = generateCSV(ioList.items);
      fs.writeFileSync(outputPath, csvContent, 'utf8');
      break;
      
    default:
      outputPath = path.join(outputDir, `io-list-${timestamp}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(ioList, null, 2), 'utf8');
  }
  
  return outputPath;
}

/**
 * Generate CSV content from I/O items
 * @param {Array} items - Array of I/O points
 * @returns {string} CSV content
 */
function generateCSV(items) {
  if (items.length === 0) return '';
  
  const headers = Object.keys(items[0]);
  let csv = headers.join(',') + '\n';
  
  for (const item of items) {
    const values = headers.map(header => {
      const value = item[header];
      // Handle values with commas by quoting
      return value === null ? '' : 
        typeof value === 'string' && value.includes(',') ? 
          `"${value}"` : String(value);
    });
    csv += values.join(',') + '\n';
  }
  
  return csv;
}

module.exports = { generateIOList };