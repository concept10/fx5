// SPDX-FileCopyrightText: 2023 OUTLAW-DMA, LLC
// SPDX-License-Identifier: MIT

import { ArchitectureService } from './services/ArchitectureService.js';
import { exportToJson } from './exporters/jsonExporter.js';
import { config } from './config.js';

export async function generateArchitecture(options = {}) {
  const architectureService = new ArchitectureService(options);
  const architecture = await architectureService.createArchitecture();
  return exportToJson(architecture);
}

export default {
  generateArchitecture,
  ArchitectureService,
  config,
  exporters: {
    toJson: exportToJson
  }
};