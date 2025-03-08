const excelParser = require('./excelParser');
const { exportToCSV } = require('./exporters/csvExporter');
const { exportToXML } = require('./exporters/xmlExporter');

async function generateTagList(options) {
  try {
    const config = {
      format: 'csv',
      sheet: 0,
      headerRow: 1,
      mapping: {
        name: 'A',
        dataType: 'B',
        address: 'C',
        comment: 'D',
        initialValue: 'E'
      },
      ...options
    };

    const tags = await excelParser.parseExcel(config.inputFile, config);

    let outputPath;
    if (config.format.toLowerCase() === 'xml') {
      outputPath = await exportToXML(tags, config.outputFile);
    } else {
      outputPath = await exportToCSV(tags, config.outputFile);
    }

    return {
      success: true,
      outputPath,
      tagCount: tags.length
    };
  } catch (error) {
    throw new Error(`Failed to generate tag list: ${error.message}`);
  }
}

module.exports = {
  generateTagList
};
