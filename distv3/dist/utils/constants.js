"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExeceptionCase = void 0;
const common_1 = require("@nestjs/common");
const ExeceptionCase = (error) => {
    switch (error.status) {
        case 409:
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: 'Boutique existe déjà.',
                error: 'Conflict',
            }, common_1.HttpStatus.CONFLICT);
            break;
        case 404:
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Donnee introuvable.',
                error: 'Non Trouvez',
            }, common_1.HttpStatus.NOT_FOUND);
            break;
        case 500:
            throw Error("Une Erreur c'est produit lord de la creation du boutique");
            break;
        default:
            break;
    }
};
exports.ExeceptionCase = ExeceptionCase;
//# sourceMappingURL=constants.js.map