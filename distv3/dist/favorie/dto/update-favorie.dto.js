"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavorieDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_favorie_dto_1 = require("./create-favorie.dto");
class UpdateFavorieDto extends (0, mapped_types_1.PartialType)(create_favorie_dto_1.CreateFavorieDto) {
}
exports.UpdateFavorieDto = UpdateFavorieDto;
//# sourceMappingURL=update-favorie.dto.js.map