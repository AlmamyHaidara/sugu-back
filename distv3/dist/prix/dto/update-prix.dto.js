"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrixDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prix_dto_1 = require("./create-prix.dto");
class UpdatePrixDto extends (0, mapped_types_1.PartialType)(create_prix_dto_1.CreatePrixDto) {
}
exports.UpdatePrixDto = UpdatePrixDto;
//# sourceMappingURL=update-prix.dto.js.map