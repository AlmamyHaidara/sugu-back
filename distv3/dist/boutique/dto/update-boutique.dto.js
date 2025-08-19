"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoutiqueDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_boutique_dto_1 = require("./create-boutique.dto");
class UpdateBoutiqueDto extends (0, mapped_types_1.PartialType)(create_boutique_dto_1.CreateBoutiqueDto) {
}
exports.UpdateBoutiqueDto = UpdateBoutiqueDto;
//# sourceMappingURL=update-boutique.dto.js.map