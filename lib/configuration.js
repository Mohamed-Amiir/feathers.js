"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationValidator = exports.configurationSchema = void 0;
const schema_1 = require("@feathersjs/schema");
const validators_1 = require("./validators");
exports.configurationSchema = {
    $id: 'configuration',
    type: 'object',
    additionalProperties: false,
    required: ['host', 'port', 'public'],
    properties: {
        ...schema_1.defaultAppSettings,
        host: { type: 'string' },
        port: { type: 'number' },
        public: { type: 'string' }
    }
};
exports.configurationValidator = (0, schema_1.getValidator)(exports.configurationSchema, validators_1.dataValidator);
//# sourceMappingURL=configuration.js.map