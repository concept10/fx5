const fs = require('fs-extra');
const path = require('path');

async function exportToCSV(tags, outputFile) {
  try {
    const filePath = outputFile || path.join(process.cwd(), `s7_tags_${Date.now()}.csv`);
    let csvContent = 'Name;Path;DataType;LogicalAddress;Comment;Hmi Visible;Hmi Accessible\n';
    
    tags.forEach(tag => {
      const address = formatAddress(tag.address);
      const row = [
        tag.name,
        '',
        tag.dataType,
        address,
        escapeCSV(tag.comment),
        'True',
        'True'
      ].join(';');
      csvContent += row + '\n';
    });

    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, csvContent, 'utf8');
    return filePath;
  } catch (error) {
    throw new Error(`CSV export error: ${error.message}`);
  }
}

function formatAddress(address) {
  if (!address) return '';
  address = address.trim().toUpperCase();
  if (address.startsWith('%')) {
    return address;
  }
  if (/^[IQMD][XB]?\d+/.test(address)) {
    return '%' + address;
  }
  if (/^[IQMD]/.test(address)) {
    return '%' + address;
  }
  return address;
}

function escapeCSV(text) {
  if (!text) return '';
  if (text.includes(';') || text.includes('\n')) {
    text = text.replace(/"/g, '""');
    return `"${text}"`;
  }
  return text;
}

module.exports = {
  exportToCSV
};
