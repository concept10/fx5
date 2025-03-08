# S7 Tag Generator

A powerful utility for generating and managing Siemens S7-1500 PLC tag lists from Excel spreadsheets for TIA Portal projects.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Command Line](#command-line)
  - [JavaScript API](#javascript-api)
- [Input Format](#input-format)
- [Output Formats](#output-formats)
- [Examples](#examples)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

S7 Tag Generator is a tool designed to streamline the creation and management of tag lists for Siemens S7-1500 PLCs. It allows you to define your tags in Excel spreadsheets and export them to various formats compatible with TIA Portal, reducing manual entry errors and saving time.

## Features

- Convert Excel spreadsheets to S7 tag lists
- Generate XML files ready for TIA Portal import
- Support for all standard S7 data types
- Batch processing of multiple spreadsheets
- Command-line interface for integration with other tools
- JavaScript API for embedding in other applications
- Validation of tag names, addresses, and data types

## Installation

```bash
# Install globally
npm install -g s7-tag-generator

# Or install locally in your project
npm install --save s7-tag-generator
```

## Usage

### Command Line

```bash
# Convert a single Excel file to XML
s7-tag-generator --input tags.xlsx --output tags.xml

# Specify sheet name
s7-tag-generator --input tags.xlsx --sheet "PLC Tags" --output tags.xml

# Convert to multiple formats
s7-tag-generator --input tags.xlsx --output tags.xml --format xml,csv
```

### JavaScript API

```javascript
const { convertExcelToTags, exportToXML } = require('s7-tag-generator');

// Convert Excel to tags object
const tags = await convertExcelToTags('path/to/excel.xlsx', {
  sheet: 'PLC Tags'
});

// Export to XML
const xmlFilePath = await exportToXML(tags, 'output.xml');
console.log(`Tags exported to ${xmlFilePath}`);
```

## Input Format

Your Excel file should contain columns with these headers:
- `Name` - Tag name
- `DataType` - S7 data type (e.g., Bool, Int, Real, String)
- `Address` - PLC address (e.g., %I0.0, %DB1.DBX0.0)
- `Comment` - Optional description of the tag

## Output Formats

- **XML**: TIA Portal compatible XML for direct import
- **CSV**: Comma-separated values for viewing in spreadsheet software
- **JSON**: Machine-readable format for processing with other tools

## Examples

The `examples` directory contains sample Excel files and scripts demonstrating common use cases.

## API Documentation

### Main Functions

- `convertExcelToTags(excelFile, options)`: Converts Excel to tag objects
- `exportToXML(tags, outputFile)`: Exports tags to TIA Portal XML format
- `exportToCSV(tags, outputFile)`: Exports tags to CSV format
- `validateTags(tags)`: Validates tag properties

See the [API documentation](docs/api.md) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see below for details.

```
MIT License

Copyright (c) 2023 OUTLAW-DMA, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
