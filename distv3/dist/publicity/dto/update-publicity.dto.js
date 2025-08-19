"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_publicity_dto_1 = require("./create-publicity.dto");
class UpdatePublicityDto extends (0, mapped_types_1.PartialType)(create_publicity_dto_1.CreatePublicityDto) {
}
exports.UpdatePublicityDto = UpdatePublicityDto;
//# sourceMappingURL=update-publicity.dto.js.map