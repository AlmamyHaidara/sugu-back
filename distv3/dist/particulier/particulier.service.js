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
const client_1 = require("@prisma/client");
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
                        isPublic: Boolean(createParticulierDto.published),
                        status: client_1.ProduitStatus.PENDING,
                        type: client_1.ProduitType.PARTICULAR,
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
                        id: Number(dataToUpdate.produitId),
                        Prix: {
                            some: {
                                particular: {
                                    userId: Number(dataToUpdate.userId),
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
                    throw new common_1.NotFoundException(`Produit #${dataToUpdate.produitId} introuvable.`);
                }
                const updatedProduit = await tx.produit.update({
                    where: { id: Number(dataToUpdate.produitId) },
                    data: {
                        nom: dataToUpdate.prodName,
                        description: dataToUpdate.prodDescription,
                        img: dataToUpdate.img,
                        categorieId: Number(dataToUpdate.categorieId),
                        isPublic: Boolean(dataToUpdate.published),
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
                if (dataToUpdate.prix || dataToUpdate.quantiter) {
                    updatedPrix = await tx.prix.update({
                        where: { id: Number(produit.Prix[0].id) },
                        data: {
                            prix: Number(dataToUpdate.prix),
                            quantiter: Number(dataToUpdate.quantiter),
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
                            userId: Number(dataToUpdate.userId),
                            particularId: Number(produit.Prix[0].particular.id),
                        },
                    })),
                });
                this.logger.log(`Produit ${dataToUpdate.produitId} modifié par utilisateur ${dataToUpdate.userId}`);
                const prixId = updatedPrix.id;
                delete dataToUpdate.Prix;
                const productFiltered = {
                    ...dataToUpdate,
                    published: Boolean(dataToUpdate.published),
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
                return {
                    ...rest,
                    published: element.isPublic,
                    prix: firstPrix.prix,
                    prixId: firstPrix.id,
                    quantiter: firstPrix.quantiter,
                    particularId: firstPrix.particularId,
                };
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
    async findAllProduitsInValidation() {
        try {
            const produits = await this.prisma.produit.findMany({
                where: {
                    NOT: {
                        status: client_1.ProduitStatus.REJECTED,
                    },
                    isPublic: true,
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
            const result = produits.map((el) => {
                const custum = {
                    ...el,
                    published: el.isPublic,
                    prix: el.Prix[0].prix,
                    prixId: el.Prix[0].id,
                    quantiter: el.Prix[0].quantiter,
                    particularId: el.Prix[0].particularId,
                    particulier: el.Prix[0].particular,
                };
                delete custum.Prix;
                return custum;
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Produits en attente de validation`,
                data: result,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la récupération des produits en attente de validation: ${error.message}`);
            throw new Error('Erreur lors de la récupération des produits en attente de validation');
        }
    }
    async validateProduct(produitId, status, comment) {
        try {
            const produit = await this.prisma.produit.findUnique({
                where: {
                    id: produitId,
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
            await this.prisma.produit.update({
                where: { id: produitId },
                data: { status },
            });
            if (status === client_1.ProduitStatus.APPROVED) {
                await this.prisma.produitValidationLog.create({
                    data: {
                        produitId,
                        adminId: 1,
                        action: status,
                    },
                });
                await this.prisma.notification.create({
                    data: {
                        utilisateurId: produit.Prix[0].particularId,
                        type: 'INFO',
                        title: 'Produit validé',
                        message: `Votre produit a été validé`,
                        status: 'UNREAD',
                        data: {
                            produitId,
                            userId: produit.Prix[0].particular.userId,
                            particularId: produit.Prix[0].particularId,
                        },
                    },
                });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: `Produit #${produitId} validé avec succès`,
                };
            }
            else if (status === client_1.ProduitStatus.REJECTED) {
                await this.prisma.produitValidationLog.create({
                    data: {
                        produitId,
                        adminId: 1,
                        action: status,
                        comment: comment,
                    },
                });
                await this.prisma.notification.create({
                    data: {
                        utilisateurId: produit.Prix[0].particularId,
                        type: 'INFO',
                        title: 'Produit rejeté',
                        message: comment || 'Votre produit a été rejeté',
                        status: 'UNREAD',
                        data: {
                            produitId,
                            userId: produit.Prix[0].particular.userId,
                            particularId: produit.Prix[0].particularId,
                        },
                    },
                });
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: `Produit #${produitId} rejeté avec succès`,
                };
            }
        }
        catch (error) {
            this.logger.error(`Erreur lors de la validation du produit: ${error.message}`);
            throw new Error('Erreur lors de la validation du produit');
        }
    }
    async revalidateProduct(produitId) {
        try {
            const produit = await this.prisma.produit.findUnique({
                where: { id: produitId },
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
            await this.prisma.produit.update({
                where: { id: produitId },
                data: { status: client_1.ProduitStatus.PENDING },
            });
            await this.prisma.notification.create({
                data: {
                    utilisateurId: produit.Prix[0].particularId,
                    type: 'INFO',
                    title: 'Produit révalidé',
                    message: `Votre produit a été remis en attente de validation`,
                    status: 'UNREAD',
                    data: {
                        produitId,
                        userId: produit.Prix[0].particular.userId,
                        particularId: produit.Prix[0].particularId,
                    },
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Produit #${produitId} révalidé avec succès`,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la révalidation du produit: ${error.message}`);
            throw new Error('Erreur lors de la révalidation du produit');
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
                    published: product.isPublic,
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
    async findAllApprovedProducts(query) {
        const { nom, categorieBoutique, categorieId, prixMin, prixMax, countryId, location, page, limit, } = query;
        const whereClause = {};
        if (nom) {
            whereClause.nom = { contains: nom };
        }
        if (categorieId) {
            whereClause.categorieId = Number(categorieId);
        }
        const prixFilter = {};
        if (prixMin || prixMax) {
            prixFilter.prix = {
                gte: prixMin ? Number(prixMin) : undefined,
                lte: prixMax ? Number(prixMax) : undefined,
            };
        }
        if (Object.keys(prixFilter).length > 0) {
            whereClause.Prix = {
                some: prixFilter,
            };
        }
        const pageNumber = page ? Number(page) : 1;
        const pageSize = limit ? Number(limit) : 60;
        const skip = (pageNumber - 1) * pageSize;
        try {
            const [totalCount, produits] = await Promise.all([
                this.prisma.produit.count({ where: whereClause }),
                this.prisma.produit.findMany({
                    where: {
                        ...whereClause,
                        status: client_1.ProduitStatus.APPROVED,
                        type: client_1.ProduitType.PARTICULAR,
                    },
                    skip,
                    take: pageSize,
                    include: {
                        categories: true,
                        Prix: {
                            include: {
                                particular: {
                                    include: {
                                        utilisateur: true,
                                    },
                                },
                            },
                        },
                    },
                }),
            ]);
            const products = produits.filter((item) => {
                if (item.Prix.length > 0) {
                    if (categorieBoutique) {
                        return item.Prix.some((prix) => prix.particularId);
                    }
                    else {
                        return true;
                    }
                }
                return false;
            });
            const dataFiltered = products.map((res) => {
                const filter = res.Prix.map((prix) => {
                    return {
                        prix: prix.prix,
                        particulier: {
                            id: prix.particular.id,
                            nom: prix.particular.utilisateur.nom,
                            prenom: prix.particular.utilisateur.prenom,
                            phone: prix.particular.utilisateur.telephone,
                            email: prix.particular.utilisateur.email,
                        },
                    };
                });
                return filter.map((el) => {
                    const categorie = res?.categories?.nom;
                    delete res.Prix;
                    delete res.categories;
                    return {
                        ...res,
                        categorie,
                        prix: el.prix,
                        particulier: el.particulier,
                    };
                })[0];
            });
            console.log(dataFiltered.length);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Liste des produits filtrés',
                data: dataFiltered,
                totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / pageSize),
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la recherche des produits');
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