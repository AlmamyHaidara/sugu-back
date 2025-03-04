"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrixService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../utils/constants");
let PrixService = class PrixService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPrixDto) {
        try {
            const produitIsExiste = await this.prisma.produit.findFirst({
                where: {
                    id: Number(createPrixDto.produitId),
                },
            });
            const boutiqueIsExiste = await this.prisma.boutique.findFirst({
                where: {
                    id: Number(createPrixDto.boutiqueId),
                },
            });
            if (!produitIsExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Produit introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            if (!boutiqueIsExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Boutique introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const produit = await this.prisma.$transaction(async (prisma) => {
                return await prisma.prix.create({
                    data: {
                        prix: createPrixDto.prix,
                        quantiter: createPrixDto.quantiter,
                        boutiques: {
                            connect: {
                                id: Number(createPrixDto.boutiqueId),
                            },
                        },
                        produits: {
                            connect: {
                                id: Number(createPrixDto.produitId),
                            },
                        },
                    },
                });
            });
            return {
                status: 201,
                data: produit,
            };
        }
        catch (error) {
            console.error(error);
            switch (error.status) {
                case 500:
                    throw Error("Une Erreur c'est produit lord de la creation du boutique");
                    break;
                default:
                    break;
            }
        }
    }
    async findAll() {
        try {
            const produit = await this.prisma.prix.findMany();
            return { status: 200, data: produit || [] };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findOne(id, productId, boutiqueId) {
        try {
            const isExiste = await this.prisma.prix.findFirst({
                where: {
                    id: Number(id),
                    produitId: Number(productId),
                    boutiqueId: Number(boutiqueId),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Prix introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return { status: 200, data: isExiste || {} };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async update(id, updatePrixDto) {
        try {
            const prixIsExiste = await this.prisma.prix.findFirst({
                where: {
                    id: Number(id),
                },
            });
            const produitIsExiste = await this.prisma.produit.findFirst({
                where: {
                    id: Number(updatePrixDto.produitId),
                },
            });
            const boutiqueIsExiste = await this.prisma.boutique.findFirst({
                where: {
                    id: Number(updatePrixDto.boutiqueId),
                },
            });
            if (!prixIsExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Prix introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            if (!produitIsExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Produit introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            if (!boutiqueIsExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Boutique introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const produit = await this.prisma.$transaction(async (prisma) => {
                return await prisma.prix.update({
                    where: {
                        id: Number(id),
                        boutiqueId: updatePrixDto.boutiqueId,
                        produitId: updatePrixDto.produitId,
                    },
                    data: {
                        prix: updatePrixDto.prix,
                        quantiter: updatePrixDto.quantiter,
                        boutiques: {
                            connect: {
                                id: Number(updatePrixDto.boutiqueId),
                            },
                        },
                        produits: {
                            connect: {
                                id: Number(updatePrixDto.produitId),
                            },
                        },
                    },
                });
            });
            return {
                status: 201,
                data: produit,
            };
        }
        catch (error) {
            console.error(error);
            switch (error.status) {
                case 500:
                    throw Error("Une Erreur c'est produit lord de la creation du boutique");
                    break;
                default:
                    break;
            }
        }
    }
    async findOneManyById(ids) {
        try {
            const userExist = await this.prisma.prix.findMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                select: {
                    id: true,
                },
            });
            return userExist.length > 0 ? userExist : null;
        }
        catch (error) {
            console.error('Error in findOneManyById:', error);
            return null;
        }
    }
    async findOneById(id) {
        try {
            const userExist = await this.prisma.prix.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                },
            });
            return userExist.id > 0 ? userExist : null;
        }
        catch (error) {
            console.error('Error in findOneManyById:', error);
            return null;
        }
    }
    async remove(id) {
        try {
            const isExiste = await this.prisma.prix.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Prix introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.$transaction(async (prisma) => {
                return await prisma.prix.delete({
                    where: {
                        id: Number(id),
                    },
                });
            });
            return {
                status: 200,
                msg: `La prix ${id} a ete suprimer avec succes`,
            };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
};
exports.PrixService = PrixService;
exports.PrixService = PrixService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrixService);
//# sourceMappingURL=prix.service.js.map