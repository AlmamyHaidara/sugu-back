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
exports.BoutiqueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../utils/constants");
let BoutiqueService = class BoutiqueService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBoutiqueDto) {
        try {
            const isExiste = await this.prisma.boutique.findFirst({
                where: {
                    nom: createBoutiqueDto.nom,
                },
            });
            const user = await this.prisma.utilisateur.findUnique({
                where: {
                    id: Number(createBoutiqueDto.userId),
                },
            });
            if (isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Boutique existe déjà.',
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
            }
            if (!user) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Utilisateur introuvable.',
                    error: 'Non Trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            console.log(!user);
            const boutique = await this.prisma.$transaction(async (prisma) => {
                return await prisma.boutique.create({
                    data: {
                        nom: createBoutiqueDto.nom,
                        categorie: createBoutiqueDto.categorie,
                        description: createBoutiqueDto.description,
                        img: createBoutiqueDto.img,
                        utilisateurs: {
                            connect: {
                                id: Number(createBoutiqueDto.userId),
                            },
                        },
                    },
                });
            });
            return {
                status: 201,
                data: boutique,
            };
        }
        catch (error) {
            console.error(error);
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
        }
    }
    async findAllShopWithProducts(shopId) {
        try {
            return await this.prisma.boutique.findFirst({
                where: {
                    id: shopId,
                },
                include: {
                    Prix: {
                        where: {
                            boutiqueId: shopId,
                        },
                        include: {
                            produits: true,
                        },
                    },
                },
            });
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
    async findAll() {
        try {
            const boutiques = await this.prisma.boutique.findMany();
            return { status: 200, data: boutiques || [] };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findOne(id) {
        try {
            const isExiste = await this.prisma.boutique.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Boutique introuvable.',
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
    async update(id, updateBoutiqueDto) {
        try {
            const isExiste = await this.prisma.boutique.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Boutique introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const boutique = await this.prisma.$transaction(async (prisma) => {
                return await prisma.boutique.update({
                    where: {
                        id: Number(id),
                    },
                    data: updateBoutiqueDto,
                });
            });
            return {
                status: 200,
                data: boutique,
            };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async remove(id) {
        try {
            const isExiste = await this.prisma.boutique.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Boutique introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.$transaction(async (prisma) => {
                return await prisma.boutique.delete({
                    where: {
                        id: Number(id),
                    },
                });
            });
            return {
                status: 200,
                msg: `La boutique ${id} a ete suprimer avec succes`,
            };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
};
exports.BoutiqueService = BoutiqueService;
exports.BoutiqueService = BoutiqueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoutiqueService);
//# sourceMappingURL=boutique.service.js.map