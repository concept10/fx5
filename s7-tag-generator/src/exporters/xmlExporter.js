const fs = require('fs-extra');
const path = require('path');
const { Builder } = require('xml2js');

async function exportToXML(tags, outputFile) {
  try {
    const filePath = outputFile || path.join(process.cwd(), `s7_tags_${Date.now()}.xml`);
    const xmlObj = {
      Document: {
        $: {
          'xsi:noNamespaceSchemaLocation': 'Siemens.Simatic.Tags.Xml.xsd',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'Version': '1.0'
        },
        AttributeList: [{}],
        ObjectList: [{
          MultilingualText: [],
          Tag: tags.map(tag => convertTagToXmlFormat(tag))
        }]
      }
    };
    
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'utf-8' },
      renderOpts: { pretty: true, indent: '  ', newline: '\n' }
    });
    
    const xmlString = builder.buildObject(xmlObj);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, xmlString, 'utf8');
    return filePath;
  } catch (error) {
    throw new Error(`XML export error: ${error.message}`);
  }
}

function convertTagToXmlFormat(tag) {
  const address = formatAddressForXml(tag.address);
  return {
    $: {
      Name: tag.name
    },
    AttributeList: [{
      LogicalAddress: [address],
      DataTypeName: [tag.dataType],
      Comment: [tag.comment || ''],
      ExternalAccessible: ['true'],
      ExternalVisible: ['true'],
      ExternalWritable: ['true']
    }]
  };
}

function formatAddressForXml(address) {
  if (!address) return '';
  address = address.trim().toUpperCase();
  if (!address.startsWith('%')) {
    address = '%' + address;
  }
  return address;
}

module.exports = {
  exportToXML
};
