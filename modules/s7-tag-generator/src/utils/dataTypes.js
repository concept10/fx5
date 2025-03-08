const VALID_S7_DATA_TYPES = [
  'BOOL', 'BYTE', 'WORD', 'DWORD', 'LWORD',
  'CHAR', 'WCHAR', 'STRING', 'WSTRING',
  'SINT', 'INT', 'DINT', 'LINT',
  'USINT', 'UINT', 'UDINT', 'ULINT',
  'REAL', 'LREAL', 'S5TIME', 'TIME', 'DATE',
  'TIME_OF_DAY', 'TOD', 'DATE_AND_TIME', 'DT',
  'DTL', 'ARRAY', 'STRUCT', 'UDT'
];

const DATA_TYPE_MAPPINGS = {
  'bit': 'BOOL',
  'boolean': 'BOOL',
  'bool': 'BOOL',
  'byte': 'BYTE',
  'word': 'WORD',
  'dword': 'DWORD',
  'lword': 'LWORD',
  'char': 'CHAR',
  'integer': 'INT',
  'int': 'INT',
  'integer16': 'INT',
  'int16': 'INT',
  'short': 'INT',
  'integer32': 'DINT',
  'int32': 'DINT',
  'long': 'DINT',
  'dint': 'DINT',
  'integer64': 'LINT',
  'int64': 'LINT',
  'lint': 'LINT',
  'uint': 'UINT',
  'uint16': 'UINT',
  'word int': 'UINT',
  'uint32': 'UDINT',
  'udint': 'UDINT',
  'dword int': 'UDINT',
  'uint64': 'ULINT',
  'ulint': 'ULINT',
  'lword int': 'ULINT',
  'real': 'REAL',
  'float': 'REAL',
  'single': 'REAL',
  'float32': 'REAL',
  'double': 'LREAL',
  'float64': 'LREAL',
  'lreal': 'LREAL',
  'string': 'STRING',
  'str': 'STRING',
  'wstring': 'WSTRING',
  'time': 'TIME',
  'date': 'DATE',
  'tod': 'TIME_OF_DAY',
  'timeofday': 'TIME_OF_DAY',
  'dt': 'DATE_AND_TIME',
  'datetime': 'DATE_AND_TIME',
  'dateandtime': 'DATE_AND_TIME'
};

function mapToS7DataType(excelType) {
  if (!excelType) return 'BOOL';
  const normalizedType = excelType.toString().trim().toLowerCase();
  const uppercaseType = normalizedType.toUpperCase();
  if (VALID_S7_DATA_TYPES.includes(uppercaseType)) {
    return uppercaseType;
  }
  if (normalizedType.includes('array') || normalizedType.includes('[')) {
    return 'ARRAY';
  }
  if (normalizedType.includes('struct') || normalizedType.includes('udt')) {
    return normalizedType.includes('udt') ? 'UDT' : 'STRUCT';
  }
  return DATA_TYPE_MAPPINGS[normalizedType] || 'BOOL';
}

function isValidS7DataType(dataType) {
  return VALID_S7_DATA_TYPES.includes(dataType.toUpperCase());
}

module.exports = {
  VALID_S7_DATA_TYPES,
  mapToS7DataType,
  isValidS7DataType
};
