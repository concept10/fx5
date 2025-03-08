import fs from 'fs/promises';
import path from 'path';
import { formatArchitectureData } from './formatters.js';

export function exportToJson(architecture) {
  const formattedData = formatArchitectureData(architecture);
  return JSON.stringify(formattedData, null, 2);
}

export async function saveToJsonFile(architecture, filePath) {
  const jsonData = exportToJson(architecture);
  const outputPath = filePath || generateDefaultFilePath();
  const directory = path.dirname(outputPath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(outputPath, jsonData, 'utf8');
  return outputPath;
}

function generateDefaultFilePath() {
  const timestamp = new Date().toISOString().replace(/[:\.]/g, '-');
  return path.join(process.cwd(), 'output', `isa112-architecture-${timestamp}.json`);
}