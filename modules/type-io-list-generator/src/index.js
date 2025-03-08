// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

/**
 * ISA Type IO List Generator
 * @see https://github.com/concept10/type-io-list-generator
 */

const { generateIOList } = require('./generator');
const { ISA_SIGNAL_TYPES } = require('./types');

// Example usage
function main() {
  try {
    const config = {
      projectName: 'Example Project',
      revision: '1.0',
      date: new Date().toISOString().split('T')[0],
      outputFormat: 'json' // Can be 'json', 'csv', 'excel'
    };
    
    const result = generateIOList(config);
    console.log(`Generated I/O list with ${result.items.length} items`);
    console.log(`Output saved to: ${result.outputPath}`);
  } catch (error) {
    console.error('Error generating I/O list:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateIOList };