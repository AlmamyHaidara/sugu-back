"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePanierDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_panier_dto_1 = require("./create-panier.dto");
class UpdatePanierDto extends (0, mapped_types_1.PartialType)(create_panier_dto_1.CreatePanierDto) {
}
exports.UpdatePanierDto = UpdatePanierDto;
//# sourceMappingURL=update-panier.dto.js.map