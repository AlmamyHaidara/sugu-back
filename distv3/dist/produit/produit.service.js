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
const client_1 = require("@prisma/client");
const fs = require("fs");
let ProduitService = class ProduitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProduitDto) {
        try {
            const categorie = await this.prisma.categorieProduit.findUnique({
                where: { id: Number(createProduitDto.categorie) },
            });
            if (!categorie) {
                throw new common_1.NotFoundException('Catégorie inexistante');
            }
            const boutiqueId = Number(createProduitDto.boutique);
            const boutique = await this.prisma.boutique.findUnique({
                where: { id: boutiqueId },
            });
            if (!boutique) {
                throw new common_1.NotFoundException(`Boutique #${createProduitDto.boutique} introuvable`);
            }
            const produit = await this.prisma.produit.create({
                data: {
                    nom: createProduitDto.nom,
                    description: createProduitDto.description,
                    img: createProduitDto.img,
                    tags: createProduitDto.tags,
                    isPublic: true,
                    status: client_1.ProduitStatus.APPROVED,
                    categories: {
                        connect: { id: Number(createProduitDto.categorie) },
                    },
                    Prix: {
                        create: {
                            prix: createProduitDto.prix,
                            quantiter: Number(createProduitDto.quantiter),
                            boutiques: {
                                connect: { id: boutiqueId },
                            },
                        },
                    },
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
            const prixId = produit.Prix[0].id;
            delete produit.Prix[0].id;
            const productFiltered = { ...produit, ...produit.Prix[0], prixId };
            delete productFiltered.Prix;
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Produit créé avec succès',
                data: productFiltered,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Une erreur est survenue lors de la création du produit.');
        }
    }
    async createParticular(createProduitDto) {
        try {
            const categorie = await this.prisma.categorieProduit.findUnique({
                where: { id: Number(createProduitDto.categorie) },
            });
            if (!categorie) {
                throw new common_1.NotFoundException('Catégorie inexistante');
            }
            const boutiqueId = Number(createProduitDto.boutique);
            const boutique = await this.prisma.boutique.findUnique({
                where: { id: boutiqueId },
            });
            if (!boutique) {
                throw new common_1.NotFoundException(`Boutique #${createProduitDto.boutique} introuvable`);
            }
            const produit = await this.prisma.produit.create({
                data: {
                    nom: createProduitDto.nom,
                    description: createProduitDto.description,
                    img: createProduitDto.img,
                    tags: createProduitDto.tags,
                    status: client_1.ProduitStatus.PENDING,
                    categories: {
                        connect: { id: Number(createProduitDto.categorie) },
                    },
                    Prix: {
                        create: {
                            prix: createProduitDto.prix,
                            quantiter: Number(createProduitDto.quantiter),
                            boutiques: {
                                connect: { id: boutiqueId },
                            },
                        },
                    },
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
            const prixId = produit.Prix[0].id;
            delete produit.Prix[0].id;
            const productFiltered = { ...produit, ...produit.Prix[0], prixId };
            delete productFiltered.Prix;
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Produit créé avec succès',
                data: productFiltered,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Une erreur est survenue lors de la création du produit.');
        }
    }
    async createA(createProduitDto) {
        try {
            const categorie = await this.prisma.categorieProduit.findUnique({
                where: { id: Number(createProduitDto.categorie) },
            });
            if (!categorie) {
                throw new common_1.NotFoundException('Catégorie inexistante');
            }
            const boutiqueId = Number(createProduitDto.boutique);
            console.log('boutiqueIdboutiqueIdboutiqueIdboutiqueId');
            console.log(boutiqueId);
            const boutique = await this.prisma.boutique.findFirst({
                where: { userId: boutiqueId },
            });
            if (!boutique) {
                throw new common_1.NotFoundException(`Boutique #${createProduitDto.boutique} introuvable`);
            }
            const produit = await this.prisma.produit.create({
                data: {
                    nom: createProduitDto.nom,
                    description: createProduitDto.description,
                    img: createProduitDto.img,
                    tags: createProduitDto.tags,
                    status: client_1.ProduitStatus.APPROVED,
                    isPublic: true,
                    categories: {
                        connect: { id: Number(createProduitDto.categorie) },
                    },
                    Prix: {
                        create: {
                            prix: createProduitDto.prix,
                            quantiter: Number(createProduitDto.quantiter),
                            boutiques: {
                                connect: { id: boutique.id },
                            },
                        },
                    },
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
            const prixId = produit.Prix[0].id;
            delete produit.Prix[0].id;
            const productFiltered = {
                ...produit,
                ...produit.Prix[0],
                prixId,
                tags: JSON.parse(produit.tags),
            };
            delete productFiltered.Prix;
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Produit créé avec succès',
                data: productFiltered,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Une erreur est survenue lors de la création du produit.');
        }
    }
    async findAll() {
        try {
            const produits = await this.prisma.produit.findMany({
                where: {
                    status: client_1.ProduitStatus.APPROVED,
                    isPublic: true,
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Liste de tous les produits',
                data: produits,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération des produits');
        }
    }
    async findAllByShop(shopId) {
        try {
            const shopExists = await this.prisma.boutique.findUnique({
                where: { id: shopId },
            });
            if (!shopExists) {
                throw new common_1.NotFoundException(`Boutique #${shopId} introuvable.`);
            }
            const produits = await this.prisma.produit.findMany({
                where: {
                    Prix: {
                        some: {
                            boutiqueId: shopId,
                            quantiter: {
                                gt: 0,
                            },
                        },
                    },
                },
                include: {
                    Prix: {
                        omit: {
                            createdAt: true,
                            updatedAt: true,
                            particularId: true,
                        },
                        include: {
                            boutiques: {
                                select: {
                                    id: true,
                                    nom: true,
                                    location: true,
                                    phone: true,
                                    categorie: true,
                                },
                            },
                        },
                    },
                },
            });
            const result = produits.map((element) => {
                const firstPrix = element.Prix[0];
                const { Prix, ...rest } = element;
                return { ...rest, ...firstPrix };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Liste des produits de la boutique #${shopId}`,
                data: result,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération des produits de la boutique');
        }
    }
    async findOne(id) {
        try {
            const produit = await this.prisma.produit.findUnique({
                where: { id: Number(id) },
            });
            if (!produit) {
                throw new common_1.NotFoundException(`Produit #${id} introuvable.`);
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Détails du produit #${id}`,
                data: produit,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération du produit');
        }
    }
    async findByShopId(shopId) {
        try {
            const prixs = await this.prisma.prix.findMany({
                where: {
                    boutiqueId: shopId,
                },
                include: {
                    produits: {
                        select: {
                            id: true,
                            categorieId: true,
                            description: true,
                            img: true,
                            nom: true,
                            tags: true,
                            categories: true,
                        },
                    },
                },
            });
            const products = prixs.flatMap((prix) => {
                const prixId = prix.id;
                const products = {
                    ...prix.produits,
                    tags: JSON.parse(prix.produits.tags),
                };
                delete prix.boutiqueId;
                delete prix.produitId;
                delete prix.produits;
                return { ...prix, prixId, ...products };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `La liste des produits`,
                data: products,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération du produit');
        }
    }
    async findByUserIdAndShopId(shopId, userId) {
        try {
            const prixs = await this.prisma.prix.findMany({
                where: {
                    boutiqueId: shopId,
                    boutiques: {
                        userId: userId,
                    },
                },
                include: {
                    produits: {
                        select: {
                            id: true,
                            categorieId: true,
                            description: true,
                            img: true,
                            nom: true,
                            tags: true,
                            categories: true,
                        },
                    },
                },
            });
            const products = prixs.flatMap((prix) => {
                const prixId = prix.id;
                const products = prix.produits;
                delete prix.boutiqueId;
                delete prix.produitId;
                delete prix.produits;
                return { ...prix, prixId, ...products };
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `La liste des produits`,
                data: products,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la récupération du produit');
        }
    }
    async update(id, updateProduitDto, file) {
        try {
            const existingProduit = await this.prisma.produit.findUnique({
                where: { id: Number(id) },
            });
            const existingPrix = await this.prisma.prix.findFirst({
                where: {
                    produitId: Number(existingProduit.id),
                    boutiqueId: Number(updateProduitDto.boutique),
                },
            });
            if (!existingProduit) {
                throw new common_1.NotFoundException(`Produit #${id} introuvable.`);
            }
            if (!existingPrix) {
                throw new common_1.NotFoundException(`Produit #${id} introuvable.`);
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
                ...updateProduitDto,
            };
            if (file) {
                dataToUpdate.img = file.path.split('uploads/')[1];
            }
            const updatedProduit = await this.prisma.produit.update({
                where: { id: Number(id) },
                data: {
                    nom: updateProduitDto.nom,
                    description: updateProduitDto.description,
                    img: dataToUpdate.img,
                    tags: updateProduitDto.tags,
                    categories: {
                        connect: { id: Number(updateProduitDto.categorie) },
                    },
                    Prix: {
                        update: {
                            where: {
                                id: existingPrix.id,
                            },
                            data: {
                                prix: updateProduitDto.prix,
                                quantiter: Number(updateProduitDto.quantiter),
                            },
                        },
                    },
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
            const prixId = updatedProduit.Prix[0].id;
            delete updatedProduit.Prix[0].id;
            const productFiltered = {
                ...updatedProduit,
                ...updatedProduit.Prix[0],
                prixId,
            };
            delete productFiltered.Prix;
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Produit #${id} mis à jour avec succès`,
                data: productFiltered,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la mise à jour du produit');
        }
    }
    async remove(id) {
        try {
            const existingProduit = await this.prisma.produit.findUnique({
                where: { id: Number(id) },
            });
            if (!existingProduit) {
                throw new common_1.NotFoundException(`Produit #${id} introuvable.`);
            }
            if (existingProduit.img) {
                try {
                    fs.access(existingProduit.img, fs.constants.F_OK, (err) => {
                        if (err) {
                            console.log("Le fichier n'existe pas.");
                        }
                        else {
                            fs.unlinkSync('uploads/' + existingProduit.img);
                        }
                    });
                }
                catch (error) {
                    console.error(`Erreur de suppression de l'image :`, error);
                }
            }
            await this.prisma.produit.deleteMany({
                where: { id: Number(id) },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Le produit #${id} a été supprimé avec succès`,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la suppression du produit');
        }
    }
    async findAllProduitsByCountryId(countryId) {
        const existingContry = await this.prisma.country.findUnique({
            where: { id: Number(countryId) },
        });
        if (!existingContry) {
            throw new common_1.NotFoundException(`Pays #${countryId} introuvable.`);
        }
        const produits = await this.prisma.produit.findMany({
            where: {
                Prix: {
                    some: {
                        boutiques: {
                            countryId: countryId,
                        },
                        quantiter: {
                            gt: 0,
                        },
                    },
                },
            },
            include: {
                categories: true,
                Prix: {
                    include: {
                        boutiques: true,
                    },
                },
            },
        });
        const products = produits.filter((item) => {
            if (item.Prix.length > 0) {
                return item;
            }
        });
        const dataFiltered = products.map((res) => {
            const filter = res.Prix.map((prix) => {
                return {
                    prix: prix.prix,
                    boutique: {
                        id: prix.boutiques.id,
                        nom: prix.boutiques.nom,
                        location: prix.boutiques.location,
                        phone: prix.boutiques.phone,
                        categorie: prix.boutiques.categorie,
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
                    boutique: el.boutique,
                };
            })[0];
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Liste des produits',
            data: dataFiltered,
        };
    }
    async findAllProduits(query) {
        const { nom, categorieBoutique, categorieId, prixMin, prixMax, countryId, location, page, limit, } = query;
        const whereClause = {};
        const whereBoutiqueClause = {};
        if (nom) {
            whereClause.nom = { contains: nom };
        }
        if (categorieId) {
            whereClause.categorieId = Number(categorieId);
        }
        if (categorieBoutique) {
            whereBoutiqueClause.categorie = categorieBoutique;
        }
        const prixFilter = {};
        if (prixMin || prixMax) {
            prixFilter.prix = {
                gte: prixMin ? Number(prixMin) : undefined,
                lte: prixMax ? Number(prixMax) : undefined,
            };
        }
        if (countryId || location) {
            prixFilter.boutiques = {
                countryId: countryId ? Number(countryId) : undefined,
                location: (location ? location : undefined),
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
                        type: client_1.ProduitType.BOUTIQUE,
                    },
                    skip,
                    take: pageSize,
                    include: {
                        categories: true,
                        Prix: {
                            include: {
                                boutiques: true,
                            },
                        },
                    },
                }),
            ]);
            const products = produits.filter((item) => {
                if (item.Prix.length > 0) {
                    if (categorieBoutique) {
                        return item.Prix.some((prix) => prix.boutiques.categorie === categorieBoutique);
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
                        boutique: {
                            id: prix.boutiques.id,
                            nom: prix.boutiques.nom,
                            location: prix.boutiques.location,
                            phone: prix.boutiques.phone,
                            categorie: prix.boutiques.categorie,
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
                        boutique: el.boutique,
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
exports.ProduitService = ProduitService;
exports.ProduitService = ProduitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProduitService);
//# sourceMappingURL=produit.service.js.map