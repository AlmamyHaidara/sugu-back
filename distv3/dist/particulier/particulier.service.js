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
exports.ParticulierService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
let ParticulierService = class ParticulierService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    async create(createParticulierDto) {
        try {
            console.log(createParticulierDto);
            const user = await this.prisma.utilisateur.findUnique({
                where: { id: +createParticulierDto.userId },
                include: { Particular: true },
            });
            return await this.prisma.$transaction(async (tx) => {
                if (!user) {
                    throw new Error('Utilisateur non trouvé');
                }
                let particular = user.Particular[0];
                if (!particular) {
                    particular = await tx.particular.create({
                        data: {
                            userId: +user.id,
                        },
                    });
                    this.logger.log(`Nouveau particulier créé pour l'utilisateur ${user.id}`);
                }
                const produit = await tx.produit.create({
                    data: {
                        nom: createParticulierDto.prodName,
                        description: createParticulierDto.prodDescription,
                        img: createParticulierDto.prodImg,
                        categorieId: +createParticulierDto.categorieId,
                        isPublic: Boolean(createParticulierDto.isPublic),
                    },
                    include: {
                        categories: true,
                        Prix: {
                            select: {
                                id: true,
                                prix: true,
                                quantiter: true,
                            },
                        },
                    },
                });
                this.logger.log(`Nouveau produit créé: ${produit.id}`);
                const prix = await tx.prix.create({
                    data: {
                        prix: +createParticulierDto.prix,
                        quantiter: +createParticulierDto.quantiter,
                        produitId: +produit.id,
                        particularId: +particular.id,
                    },
                });
                const admins = await tx.utilisateur.findMany({
                    where: { profile: 'ADMIN' },
                });
                await tx.notification.createMany({
                    data: admins.map((admin) => ({
                        utilisateurId: admin.id,
                        type: 'INFO',
                        title: 'Nouveau produit à valider',
                        message: `Nouveau produit publié par ${user.nom} (${user.email}) en attente de validation`,
                        status: 'UNREAD',
                        data: {
                            produitId: +produit.id,
                            userId: +user.id,
                            particularId: +particular.id,
                        },
                    })),
                });
                const prixId = prix.id;
                const productFiltered = {
                    ...produit,
                    ...prix,
                    prixId,
                    tags: JSON.parse(produit.tags),
                };
                delete productFiltered.Prix;
                return {
                    statusCode: common_1.HttpStatus.CREATED,
                    message: 'Produit créé avec succès',
                    data: productFiltered,
                };
            }, {
                timeout: 10000,
            });
        }
        catch (error) {
            this.logger.error(`Erreur lors de la publication: ${error.message}`);
            throw new Error('Erreur lors de la publication du produit');
        }
    }
    async updateProduct(updateData, file) {
        try {
            const existingProduit = await this.prisma.produit.findUnique({
                where: { id: Number(updateData.produitId) },
            });
            const existingPrix = await this.prisma.prix.findFirst({
                where: {
                    produitId: Number(existingProduit.id),
                    particularId: Number(updateData.id),
                },
            });
            if (!existingProduit) {
                throw new common_1.NotFoundException(`Produit #${updateData.produitId} introuvable.`);
            }
            if (!existingPrix) {
                throw new common_1.NotFoundException(`Produit #${updateData.produitId} introuvable.`);
            }
            if (file && existingProduit.img) {
                try {
                    fs.access('uploads/' + existingProduit.img, fs.constants.F_OK, (err) => {
                        if (err) {
                            console.log("Le fichier n'existe pas.");
                        }
                        else {
                            fs.unlinkSync('uploads/' + existingProduit.img);
                        }
                    });
                }
                catch (error) {
                    console.error(`Erreur de suppression de l'ancien fichier :`, error);
                }
            }
            const dataToUpdate = {
                ...updateData,
            };
            if (file) {
                dataToUpdate.img = file.path.split('uploads/')[1];
            }
            const result = await this.prisma.$transaction(async (tx) => {
                const produit = await tx.produit.findFirst({
                    where: {
                        id: Number(updateData.produitId),
                        Prix: {
                            some: {
                                particular: {
                                    userId: Number(updateData.userId),
                                },
                            },
                        },
                    },
                    include: {
                        Prix: {
                            include: {
                                particular: true,
                            },
                        },
                    },
                });
                if (!produit) {
                    throw new common_1.NotFoundException(`Produit #${updateData.produitId} introuvable.`);
                }
                const updatedProduit = await tx.produit.update({
                    where: { id: Number(updateData.produitId) },
                    data: {
                        nom: updateData.prodName,
                        description: updateData.prodDescription,
                        img: updateData.prodImg,
                        categorieId: Number(updateData.categorieId),
                        isPublic: false,
                    },
                    include: {
                        categories: true,
                        Prix: {
                            select: {
                                id: true,
                                prix: true,
                                quantiter: true,
                                particular: true,
                                particularId: true,
                            },
                        },
                    },
                });
                let updatedPrix = updatedProduit.Prix[0];
                if (updateData.prix || updateData.quantiter) {
                    updatedPrix = await tx.prix.update({
                        where: { id: Number(produit.Prix[0].id) },
                        data: {
                            prix: Number(updateData.prix),
                            quantiter: Number(updateData.quantiter),
                        },
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                            particular: true,
                            particularId: true,
                        },
                    });
                }
                const admins = await tx.utilisateur.findMany({
                    where: { profile: 'ADMIN' },
                });
                await tx.notification.createMany({
                    data: admins.map((admin) => ({
                        utilisateurId: Number(admin.id),
                        type: 'INFO',
                        title: 'Produit modifié à valider',
                        message: `Un produit a été modifié et nécessite une nouvelle validation`,
                        status: 'UNREAD',
                        data: {
                            produitId: Number(produit.id),
                            userId: Number(updateData.userId),
                            particularId: Number(produit.Prix[0].particular.id),
                        },
                    })),
                });
                this.logger.log(`Produit ${updateData.produitId} modifié par utilisateur ${updateData.userId}`);
                const prixId = updatedPrix.id;
                delete updatedProduit.Prix;
                const productFiltered = {
                    ...updatedProduit,
                    ...updatedPrix,
                    prixId,
                };
                delete productFiltered.Prix;
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: 'Produit modifié avec succès',
                    data: productFiltered,
                };
            }, {
                timeout: 15000,
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Erreur lors de la modification: ${error.message}`);
            throw new Error('Erreur lors de la modification du produit');
        }
    }
    async deleteProduct(userId, produitId) {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                console.log('deleteProduct', userId, {
                    where: {
                        id: produitId,
                        Prix: {
                            some: {
                                particular: {
                                    userId: userId,
                                },
                            },
                        },
                    },
                    include: {
                        Prix: {
                            include: {
                                particular: true,
                            },
                        },
                    },
                });
                const produit = await tx.produit.findFirst({
                    where: {
                        id: produitId,
                        Prix: {
                            some: {
                                particular: {
                                    userId: userId,
                                },
                            },
                        },
                    },
                    include: {
                        Prix: {
                            include: {
                                particular: true,
                            },
                        },
                    },
                });
                if (!produit) {
                    throw new common_1.NotFoundException(`Produit #${produitId} introuvable.`);
                }
                await tx.produit.delete({
                    where: { id: produitId },
                });
                this.logger.log(`Produit ${produitId} supprimé par utilisateur ${userId}`);
                return { message: 'Produit supprimé avec succès' };
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Erreur lors de la suppression: ${error.message}`);
            throw new common_1.InternalServerErrorException(`Erreur lors de la suppression du produit`);
        }
    }
    async findAllProducts(userId) {
        try {
            const products = await this.prisma.produit.findMany({
                where: {
                    Prix: {
                        some: {
                            particular: {
                                userId: userId,
                            },
                        },
                    },
                },
                include: {
                    Prix: {
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                            boutiqueId: true,
                            particularId: true,
                        },
                    },
                },
            });
            const result = products.map((element) => {
                const firstPrix = element.Prix[0];
                const { Prix, ...rest } = element;
                return { ...rest, ...firstPrix };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Liste des produits de la boutique #${userId}`,
                data: result,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la récupération des produits: ${error.message}`);
            throw new Error('Erreur lors de la récupération des produits');
        }
    }
    async findProductById(userId, productId) {
        try {
            const product = await this.prisma.produit.findFirst({
                where: {
                    id: productId,
                    Prix: {
                        some: {
                            particular: {
                                userId: userId,
                            },
                        },
                    },
                },
                include: {
                    Prix: {
                        include: {
                            particular: true,
                            LigneCommand: {
                                include: {
                                    Commande: true,
                                },
                            },
                        },
                    },
                    categories: true,
                },
            });
            if (!product) {
                throw new Error('Produit non trouvé ou non autorisé');
            }
            const result = product.Prix.map((el) => {
                const custum = {
                    ...product,
                    prix: el.prix,
                    prixId: el.id,
                    quantiter: el.quantiter,
                    particularId: el.particularId,
                    particulier: el.particular,
                };
                delete custum.Prix;
                return custum;
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Produit #${productId} de la boutique #${userId}`,
                data: result,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la récupération du produit: ${error.message}`);
            throw new Error('Erreur lors de la récupération du produit');
        }
    }
};
exports.ParticulierService = ParticulierService;
exports.ParticulierService = ParticulierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_1.Logger])
], ParticulierService);
//# sourceMappingURL=particulier.service.js.map