const ExcelJS = require('exceljs');
const path = require('path');
const { validateTag } = require('./utils/validation');
const { mapToS7DataType } = require('./utils/dataTypes');

async function parseExcel(filePath, options) {
  try {
    const workbook = new ExcelJS.Workbook();
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.xlsx' || extension === '.xlsm') {
      await workbook.xlsx.readFile(filePath);
    } else if (extension === '.xls') {
      await workbook.xlsx.readFile(filePath);
    } else {
      throw new Error('Unsupported file format. Use .xlsx, .xlsm, or .xls');
    }

    const worksheet = typeof options.sheet === 'string' 
      ? workbook.getWorksheet(options.sheet)
      : workbook.worksheets[options.sheet || 0];
    
    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const tags = [];
    const { mapping, headerRow = 1 } = options;

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber <= headerRow) return;

      const tag = {
        name: getCellValue(row, mapping.name),
        dataType: mapToS7DataType(getCellValue(row, mapping.dataType)),
        address: getCellValue(row, mapping.address),
        comment: getCellValue(row, mapping.comment) || '',
        initialValue: getCellValue(row, mapping.initialValue) || ''
      };

      if (validateTag(tag)) {
        tags.push(tag);
      }
    });

    return tags;
  } catch (error) {
    throw new Error(`Excel parsing error: ${error.message}`);
  }
}

function getCellValue(row, column) {
  if (!column) return '';
  let columnIndex;
  if (typeof column === 'string' && /^[A-Za-z]+$/.test(column)) {
    columnIndex = columnToNumber(column);
  } else {
    columnIndex = Number(column);
  }
  const cell = row.getCell(columnIndex);
  return cell ? (cell.text || cell.value || '').toString() : '';
}

function columnToNumber(column) {
  let result = 0;
  for (let i = 0; i < column.length; i++) {
    result = result * 26 + column.charCodeAt(i) - 64;
  }
  return result;
}

module.exports = {
  parseExcel
};
