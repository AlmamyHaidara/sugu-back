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
exports.ProduitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../utils/constants");
let ProduitService = class ProduitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProduitDto) {
        try {
            const produit = await this.prisma.$transaction(async (prisma) => {
                return await prisma.produit.create({
                    data: {
                        nom: createProduitDto.nom,
                        categorie: createProduitDto.categorie,
                        description: createProduitDto.description,
                        img: createProduitDto.img,
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
            const produit = await this.prisma.produit.findMany();
            return { status: 200, data: produit || [] };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findOne(id) {
        try {
            const isExiste = await this.prisma.produit.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Produit introuvable.',
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
    async update(id, updateProduitDto) {
        try {
            const isExiste = await this.prisma.produit.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Produit introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const boutique = await this.prisma.$transaction(async (prisma) => {
                return await prisma.produit.update({
                    where: {
                        id: Number(id),
                    },
                    data: updateProduitDto,
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
            const isExiste = await this.prisma.produit.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!isExiste) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Produit introuvable.',
                    error: 'Non trouvez',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const boutique = await this.prisma.$transaction(async (prisma) => {
                return await prisma.produit.delete({
                    where: {
                        id: Number(id),
                    },
                });
            });
            return {
                status: 200,
                msg: `La produit ${id} a ete suprimer avec succes`,
            };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
};
exports.ProduitService = ProduitService;
exports.ProduitService = ProduitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProduitService);
//# sourceMappingURL=produit.service.js.map