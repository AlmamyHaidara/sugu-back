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
exports.PanierService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PanierService = class PanierService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(data) {
        try {
            const user = await this.prisma.utilisateur.findFirst({
                where: {
                    id: data.utilisateurId,
                },
                select: {
                    id: true,
                },
            });
            if (!user) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Ressource non trover.',
                    error: 'Non trouve',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const boutique = await this.prisma.boutique.findFirst({
                where: {
                    id: data.boutiqueId,
                },
                select: {
                    id: true,
                },
            });
            if (!boutique) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Ressource non trover.',
                    error: 'Non trouve',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const produit = await this.prisma.produit.findFirst({
                where: {
                    id: data.produitId,
                },
                select: {
                    id: true,
                },
            });
            if (!produit) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Ressource non trover.',
                    error: 'Non trouve',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const isExiste = await this.prisma.panier.findFirst({
                where: {
                    boutiqueId: boutique.id,
                    produitId: produit.id,
                    utilisateurId: user.id,
                },
                select: {
                    id: true,
                    count: true,
                },
            });
            console.log(isExiste);
            if (isExiste) {
                const updateBasket = await this.prisma.panier.update({
                    where: {
                        id: isExiste.id,
                    },
                    data: {
                        count: data.count + isExiste.count,
                    },
                });
                return updateBasket;
            }
            else {
                const newPanier = await this.prisma.panier.create({
                    data: {
                        count: data.count,
                        boutiques: {
                            connect: {
                                id: data.boutiqueId,
                            },
                        },
                        produits: {
                            connect: {
                                id: data.produitId,
                            },
                        },
                        utilisateurs: {
                            connect: {
                                id: data.utilisateurId,
                            },
                        },
                    },
                });
                if (!newPanier) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal error',
                        error: 'Internal error',
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return newPanier;
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }
    async getCart(boutiqueId) {
        return this.prisma.panier.findMany({
            where: { boutiqueId },
            include: {
                produits: true,
                boutiques: true,
            },
        });
    }
    async getCartByUser(utilisateurId) {
        const cartItems = await this.prisma.panier.findMany({
            where: { utilisateurId },
            select: {
                boutiqueId: true,
                count: true,
                id: true,
                boutiques: {
                    select: {
                        id: true,
                        nom: true,
                        categorie: true,
                        description: true,
                        img: true,
                    },
                },
                produits: {
                    select: {
                        id: true,
                        nom: true,
                        categories: true,
                        description: true,
                        img: true,
                        Prix: {
                            select: {
                                prix: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        const reformattedCartItems = cartItems.map((item) => {
            const { Prix, ...otherProduits } = item.produits || {};
            return {
                ...item,
                produits: {
                    ...otherProduits,
                    prixId: Prix?.[0]?.id,
                    prix: Prix?.[0]?.prix,
                },
            };
        });
        const cumulatedItems = reformattedCartItems.reduce((acc, item) => {
            const existingItem = acc.find((prod) => prod.produits.id === item.produits.id);
            if (existingItem) {
                existingItem.count += item.count;
            }
            else {
                acc.push({ ...item });
            }
            return acc;
        }, []);
        return cumulatedItems;
    }
    async updateCartItem(id, count) {
        const isExiste = await this.prisma.panier.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
            },
        });
        if (!isExiste) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.prisma.panier.update({
            where: { id },
            data: { count },
        });
    }
    async removeFromCart(id) {
        try {
            const isDeleted = await this.prisma.panier.delete({
                where: { id },
            });
            console.log(isDeleted);
            return true;
        }
        catch (error) {
            console.log(error?.code);
            return null;
        }
    }
    async emptyCart(boutiqueId) {
        return this.prisma.panier.deleteMany({
            where: { boutiqueId },
        });
    }
};
exports.PanierService = PanierService;
exports.PanierService = PanierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PanierService);
//# sourceMappingURL=panier.service.js.map