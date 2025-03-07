# ISA Type I/O List Generator

A modern JavaScript tool for generating standardized ISA (Instrument Society of America) type Input/Output lists for industrial automation projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [I/O Point Structure](#io-point-structure)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

## Features

- Create standardized I/O lists with proper ISA formatting
- Support for all common signal types (AI, AO, DI, DO, PI, etc.)
- Export to multiple formats (JSON, CSV, Excel)
- Validation of I/O points according to ISA standards
- Web interface for easy list creation and management

## Installation

```bash
# Clone the repository
git clone https://github.com/concept10/type-io-list-generator.git

# Navigate to the project directory
cd type-io-list-generator

# Install dependencies 
npm install
```

## Usage

### Command Line

```bash
npm start
```

### Web Interface

Open `index.html` in your browser to use the web interface.

## API

```javascript
const { generateIOList } = require('./src/generator');

const config = {
  projectName: 'My Automation Project',
  revision: '1.0',
  date: '2025-03-07',
  outputFormat: 'json'
};

const result = generateIOList(config);
console.log(`Generated I/O list saved to: ${result.outputPath}`);
```

## I/O Point Structure

Each I/O point has the following attributes:

- `tagNumber`: Unique identifier (e.g., AI0001)
- `signalType`: Type of signal (AI, AO, DI, DO, etc.)
- `description`: Text description of the point
- `units`: Engineering units (mA, V, etc.)
- `rangeMin`: Minimum range value
- `rangeMax`: Maximum range value
- `hardwareAddress`: Physical I/O address
- `notes`: Additional information
- `alarmLow`: Low alarm threshold
- `alarmHigh`: High alarm threshold

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Links

- [GitHub Repository](https://github.com/concept10/type-io-list-generator)
- [Issue Tracker](https://github.com/concept10/type-io-list-generator/issues)