"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoutiqueProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_boutique_dto_1 = require("./create-boutique.dto");
class UpdateBoutiqueProfileDto extends (0, mapped_types_1.OmitType)(create_boutique_dto_1.CreateBoutiqueDto, ['userId', 'countryId', "categorie", "location"]) {
}
exports.UpdateBoutiqueProfileDto = UpdateBoutiqueProfileDto;
//# sourceMappingURL=update-boutique-profile.dto.js.map