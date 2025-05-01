"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategorieProduitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_categorie_produit_dto_1 = require("./create-categorie-produit.dto");
class UpdateCategorieProduitDto extends (0, mapped_types_1.PartialType)(create_categorie_produit_dto_1.CreateCategorieProduitDto) {
}
exports.UpdateCategorieProduitDto = UpdateCategorieProduitDto;
//# sourceMappingURL=update-categorie-produit.dto.js.map