const { isValidS7DataType } = require('./dataTypes');

function validateTag(tag) {
  if (!tag.name || typeof tag.name !== 'string' || tag.name.trim() === '') {
    console.warn(`Skipping tag with invalid name: ${JSON.stringify(tag)}`);
    return false;
  }
  if (!isValidTagName(tag.name)) {
    console.warn(`Skipping tag with invalid name format: ${tag.name}`);
    return false;
  }
  if (!tag.dataType) {
    console.warn(`Tag "${tag.name}" is missing a data type`);
    return false;
  }
  if (!isValidS7DataType(tag.dataType)) {
    console.warn(`Tag "${tag.name}" has invalid data type: ${tag.dataType}`);
    return false;
  }
  if (!tag.address || typeof tag.address !== 'string') {
    console.warn(`Tag "${tag.name}" has invalid address: ${tag.address}`);
    return false;
  }
  return true;
}

function isValidTagName(name) {
  const validNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,127}$/;
  return validNameRegex.test(name);
}

function validateAddress(address) {
  if (!address) {
    return { isValid: false, reason: 'Address is empty' };
  }
  address = address.trim().toUpperCase();
  if (address.startsWith('%')) {
    address = address.substring(1);
  }
  if (!/^[IQMD]/.test(address)) {
    return { 
      isValid: false, 
      reason: 'Address must start with I, Q, M, or D (Input, Output, Memory, or Data block)' 
    };
  }
  if (/^[IQM]/.test(address)) {
    const memoryPattern = /^[IQM]([XBWDLxbwdl])?(\d+)(\.(\d+))?$/;
    if (!memoryPattern.test(address)) {
      return {
        isValid: false,
        reason: 'Invalid address format for I/Q/M area'
      };
    }
    const matches = address.match(memoryPattern);
    const size = matches[1] ? matches[1].toUpperCase() : 'X';
    const bitAddress = matches[4];
    if (size === 'X' && (!bitAddress || parseInt(bitAddress) > 7)) {
      return {
        isValid: false,
        reason: 'Bit address must be between 0 and 7'
      };
    }
  }
  if (/^D/.test(address)) {
    const dbPattern = /^DB(\d+)\.(.+)$/;
    if (!dbPattern.test(address)) {
      return {
        isValid: false,
        reason: 'Invalid DB address format'
      };
    }
  }
  return { isValid: true };
}

module.exports = {
  validateTag,
  isValidTagName,
  validateAddress
};
