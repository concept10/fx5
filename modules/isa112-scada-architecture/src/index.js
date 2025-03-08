import { generateArchitecture } from './generators/architectureGenerator';
import { exportToJson } from './exporters/jsonExporter';

const architectureData = generateArchitecture();
const architectureJson = exportToJson(architectureData);

export default architectureJson;