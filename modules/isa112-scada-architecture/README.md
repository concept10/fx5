# ISA-112 SCADA Architecture

This project provides a comprehensive module for generating and exporting the ISA-112 SCADA architecture in JSON format. It includes classes for defining architecture, components, and their relationships, along with utilities for validation and formatting.

## Project Structure

- **src/**: Contains the source code for the module.
  - **index.js**: Entry point for the module.
  - **models/**: Defines the core classes for architecture, components, and relationships.
  - **generators/**: Contains functions for generating the architecture.
  - **exporters/**: Provides functionality to export the architecture data in various formats.
  - **utils/**: Includes utility functions for validation and constants.

- **test/**: Contains unit tests for models, generators, and exporters to ensure functionality and correctness.

- **examples/**: Provides example scripts demonstrating how to generate and export the ISA-112 architecture.

## Installation

To install the necessary dependencies, run:

```
npm install
```

## Usage

To generate the ISA-112 architecture and export it to JSON, you can use the following code in your application:

```javascript
const architectureGenerator = require('./src/generators/architectureGenerator');
const jsonExporter = require('./src/exporters/jsonExporter');

const architecture = architectureGenerator();
const jsonData = jsonExporter(architecture);

console.log(jsonData);
```

## Running Tests

To run the unit tests, use the following command:

```
npm test
```

## Contribution

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.