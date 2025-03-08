const fs = require('fs');

function exportToJson(architecture) {
    const jsonData = JSON.stringify(architecture, null, 2);
    fs.writeFileSync('architecture.json', jsonData, 'utf8');
    return jsonData;
}

module.exports = exportToJson;