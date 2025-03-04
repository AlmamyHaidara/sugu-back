"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdresseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_adresse_dto_1 = require("./create-adresse.dto");
class UpdateAdresseDto extends (0, mapped_types_1.PartialType)(create_adresse_dto_1.CreateAdresseDto) {
}
exports.UpdateAdresseDto = UpdateAdresseDto;
//# sourceMappingURL=update-adresse.dto.js.map