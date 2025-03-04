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
const fs = require("fs");
let BoutiqueService = class BoutiqueService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBoutiqueDto) {
        try {
            const user = await this.prisma.utilisateur.findUnique({
                where: { id: Number(createBoutiqueDto.userId) },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Utilisateur #${createBoutiqueDto.userId} introuvable`);
            }
            const existingByName = await this.prisma.boutique.findFirst({
                where: { nom: createBoutiqueDto.nom },
            });
            if (existingByName) {
            }
            console.log('===========================================', Number(createBoutiqueDto.countryId));
            const country = await this.prisma.country.findUnique({
                where: { id: Number(createBoutiqueDto.countryId) },
            });
            if (!country) {
                throw new common_1.NotFoundException(`Country #${createBoutiqueDto.countryId} introuvable`);
            }
            const boutique = await this.prisma.boutique.create({
                data: {
                    nom: createBoutiqueDto.nom,
                    phone: createBoutiqueDto.phone,
                    location: createBoutiqueDto.location,
                    img: createBoutiqueDto.img,
                    description: createBoutiqueDto.description,
                    categorie: createBoutiqueDto.categorie,
                    utilisateurs: {
                        connect: {
                            id: Number(createBoutiqueDto.userId),
                        },
                    },
                    country: {
                        connect: {
                            id: Number(country.id),
                        },
                    },
                },
            });
            return {
                statusCode: 201,
                data: boutique,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la création de la boutique');
        }
    }
    async findAllShopAndProducts() {
        try {
            const boutiques = await this.prisma.boutique.findMany();
            const products = await this.prisma.produit.findMany({
                include: {
                    categories: {
                        select: { nom: true },
                    },
                    Prix: {
                        select: { prix: true, boutiqueId: true },
                    },
                },
            });
            const productCustom = products.map((p) => {
                const cat = p.categories?.nom || null;
                const firstPrix = p.Prix[0] || null;
                delete p.categories;
                delete p.Prix;
                return {
                    ...p,
                    categorie: cat,
                    prix: firstPrix?.prix || null,
                    boutiqueId: firstPrix?.boutiqueId || null,
                };
            });
            return {
                statusCode: 200,
                boutiques,
                products: productCustom,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération des boutiques et produits');
        }
    }
    async findAllShopWithProducts(shopId) {
        try {
            const boutique = await this.prisma.boutique.findUnique({
                where: { id: shopId },
                include: {
                    Prix: {
                        where: { boutiqueId: shopId },
                        include: {
                            produits: {
                                include: {
                                    categories: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!boutique) {
                throw new common_1.NotFoundException(`Boutique #${shopId} introuvable`);
            }
            const boutiqueFiltered = boutique.Prix.map((prix) => {
                const customPrice = {
                    ...prix.produits,
                    categorie: prix.produits.categories.nom,
                    produitId: prix.produitId,
                    boutiqueId: prix.boutiqueId,
                    prix: prix.prix,
                };
                delete customPrice.categories;
                delete prix.produits;
                return customPrice;
            });
            return {
                statusCode: 200,
                data: boutiqueFiltered,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération de la boutique et ses produits');
        }
    }
    async findAllShopByUser(userId) {
        try {
            const boutiques = await this.prisma.boutique.findMany({
                where: { userId: userId },
            });
            return {
                statusCode: 200,
                data: boutiques,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération des boutiques par utilisateur');
        }
    }
    async findAll() {
        try {
            const boutiques = await this.prisma.boutique.findMany();
            return {
                statusCode: 200,
                data: boutiques,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération de toutes les boutiques');
        }
    }
    async findOne(id) {
        try {
            const boutique = await this.prisma.boutique.findUnique({
                where: { id: Number(id) },
            });
            if (!boutique) {
                throw new common_1.NotFoundException(`Boutique #${id} introuvable`);
            }
            return {
                statusCode: 200,
                data: boutique,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération de la boutique');
        }
    }
    async update(id, updateBoutiqueDto) {
        const existing = await this.prisma.boutique.findUnique({
            where: { id: Number(id) },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Boutique #${id} introuvable`);
        }
        if (updateBoutiqueDto.img && existing.img) {
            try {
                fs.unlinkSync(existing.img);
            }
            catch (err) {
            }
        }
        try {
            const updated = await this.prisma.boutique.update({
                where: { id: Number(id) },
                data: {
                    nom: updateBoutiqueDto.nom,
                    phone: updateBoutiqueDto.phone,
                    location: updateBoutiqueDto.location,
                    img: updateBoutiqueDto.img,
                    description: updateBoutiqueDto.description,
                    categorie: updateBoutiqueDto.categorie,
                    utilisateurs: {
                        connect: {
                            id: Number(updateBoutiqueDto.userId),
                        },
                    },
                    country: {
                        connect: {
                            id: Number(updateBoutiqueDto.countryId),
                        },
                    },
                },
            });
            return {
                statusCode: 200,
                data: updated,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la mise à jour de la boutique');
        }
    }
    async remove(id) {
        const boutique = await this.prisma.boutique.findUnique({
            where: { id: Number(id) },
        });
        if (!boutique) {
            throw new common_1.NotFoundException(`Boutique #${id} introuvable`);
        }
        if (boutique.img) {
            try {
                fs.unlinkSync(boutique.img);
            }
            catch (err) {
            }
        }
        try {
            const deleted = await this.prisma.boutique.delete({
                where: { id: Number(id) },
            });
            return {
                statusCode: 200,
                data: deleted,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erreur lors de la suppression de la boutique');
        }
    }
};
exports.BoutiqueService = BoutiqueService;
exports.BoutiqueService = BoutiqueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoutiqueService);
//# sourceMappingURL=boutique.service.js.map