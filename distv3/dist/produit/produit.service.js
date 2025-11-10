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
                    img: '',
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
                    Image: true,
                    Prix: {
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                        },
                    },
                },
            });
            const images = createProduitDto.imgs.map((img) => {
                return { img, produitId: produit.id };
            });
            const imageSaved = await this.prisma.image.createMany({
                data: images,
            });
            const prd = await this.prisma.produit.findFirst({
                where: {
                    id: produit.id,
                },
                include: {
                    categories: true,
                    Image: true,
                    Prix: {
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                        },
                    },
                },
            });
            const prixId = prd.Prix[0].id;
            delete prd.Prix[0].id;
            const productFiltered = {
                ...prd,
                ...prd.Prix[0],
                prixId,
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
                    Image: true,
                    Prix: {
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                        },
                    },
                },
            });
            const images = createProduitDto.imgs.map((img) => {
                return { img, produitId: produit.id };
            });
            const imageSaved = await this.prisma.image.createMany({
                data: images,
            });
            const prixId = produit.Prix[0].id;
            delete produit.Prix[0].id;
            const productFiltered = {
                ...produit,
                ...produit.Prix[0],
                prixId,
                img: imageSaved,
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
                    Image: true,
                    Prix: {
                        select: {
                            id: true,
                            prix: true,
                            quantiter: true,
                        },
                    },
                },
            });
            const images = createProduitDto.imgs.map((img) => {
                return { img, produitId: produit.id };
            });
            const imageSaved = await this.prisma.image.createMany({
                data: images,
            });
            const prixId = produit.Prix[0].id;
            delete produit.Prix[0].id;
            const productFiltered = {
                ...produit,
                ...produit.Prix[0],
                prixId,
                tags: JSON.parse(produit.tags),
                img: imageSaved,
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
    async findAllByShop(shopId, userId) {
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
                    Favorie: {
                        where: {
                            userId: userId,
                        },
                    },
                    Image: true,
                    categories: true,
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
    async findByShopId(shopId, userId) {
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
                            nom: true,
                            tags: true,
                            categories: true,
                            Favorie: {
                                where: {
                                    userId: userId,
                                },
                            },
                            Image: true,
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
                return { ...prix, prixId, ...{ ...products, imgs: products.Image } };
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
                        include: {
                            categories: true,
                            Favorie: {
                                where: {
                                    userId: userId,
                                },
                            },
                            Image: true,
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
                return { ...prix, prixId, ...{ ...products, imgs: products.Image } };
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
        return this.prisma.$transaction(async (tx) => {
            const produit = await tx.produit.findUnique({
                where: { id: Number(id) },
                include: { Image: true },
            });
            if (!produit) {
                throw new common_1.NotFoundException(`Produit #${id} introuvable.`);
            }
            const prix = await tx.prix.findFirst({
                where: {
                    produitId: Number(id),
                    boutiqueId: Number(updateProduitDto.boutique),
                },
            });
            if (!prix) {
                throw new common_1.NotFoundException(`Prix pour le produit #${id} dans la boutique #${updateProduitDto.boutique} introuvable.`);
            }
            if (file && file.length > 0) {
                if (produit.Image.length > 0) {
                    produit.Image.forEach((image) => {
                        try {
                            const filePath = `uploads/${image.img}`;
                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath);
                            }
                        }
                        catch (error) {
                            console.error(`Erreur de suppression de l'ancien fichier : ${image.img}`, error);
                        }
                    });
                    await tx.image.deleteMany({ where: { produitId: Number(id) } });
                }
                const newImages = file.map((f) => ({
                    img: f.path.split('uploads/')[1] || f.path.split('uploads\\')[1],
                    produitId: Number(id),
                }));
                await tx.image.createMany({ data: newImages });
            }
            const updatedProduit = await tx.produit.update({
                where: { id: Number(id) },
                data: {
                    nom: updateProduitDto.nom,
                    description: updateProduitDto.description,
                    tags: updateProduitDto.tags,
                    categorieId: Number(updateProduitDto.categorie),
                },
            });
            const updatedPrix = await tx.prix.update({
                where: { id: prix.id },
                data: {
                    prix: updateProduitDto.prix,
                    quantiter: Number(updateProduitDto.quantiter),
                },
            });
            const finalProduit = await tx.produit.findUnique({
                where: { id: Number(id) },
                include: {
                    categories: true,
                    Image: true,
                    Favorie: true,
                    Prix: { where: { id: updatedPrix.id } },
                },
            });
            const productFiltered = {
                ...finalProduit,
                prix: finalProduit.Prix[0].prix,
                quantiter: finalProduit.Prix[0].quantiter,
                prixId: finalProduit.Prix[0].id,
            };
            delete productFiltered.Prix;
            return {
                statusCode: common_1.HttpStatus.OK,
                message: `Produit #${id} mis à jour avec succès`,
                data: productFiltered,
            };
        });
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
    async findAllProduitsByCountryId(countryId, userId) {
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
                Image: true,
                Favorie: {
                    where: {
                        userId: userId,
                    },
                },
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
                    quantiter: prix.quantiter,
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
    async findAllProduits(query, userId) {
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
                        Image: true,
                        Prix: {
                            include: {
                                boutiques: true,
                            },
                        },
                        Favorie: {
                            where: {
                                userId: userId,
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
                        quantiter: prix.quantiter,
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
                        imgs: res.Image,
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