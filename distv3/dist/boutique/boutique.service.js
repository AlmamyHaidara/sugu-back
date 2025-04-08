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
const mail_service_1 = require("../mail/mail.service");
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const users_service_1 = require("../users/users.service");
const data_1 = require("../mail/data");
const bcrypt_1 = require("bcrypt");
let BoutiqueService = class BoutiqueService {
    constructor(prisma, mailService, usersService) {
        this.prisma = prisma;
        this.mailService = mailService;
        this.usersService = usersService;
        this.getSalesStats = (commandes) => {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            const dailySales = Array.from({ length: 31 }, () => 0);
            const filtered = commandes.filter((cmd) => {
                if (cmd.etat === 'LIVRER') {
                    const cmdDate = new Date(cmd.createdAt);
                    return (cmdDate.getMonth() === currentMonth &&
                        cmdDate.getFullYear() === currentYear);
                }
                return false;
            });
            filtered.forEach((cmd) => {
                const day = new Date(cmd.createdAt).getDate() - 1;
                dailySales[day] += 1;
            });
            return {
                total: filtered.length,
                daily: dailySales.slice(0, today.getDate()),
            };
        };
        this.getRevenueStats = (cmd) => {
            const commandes = cmd.filter((cm) => {
                return cm.etat == 'LIVRER';
            });
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            const monthlyRevenue = Array(5).fill(0);
            commandes.forEach((commande) => {
                const cmdDate = new Date(commande.createdAt);
                const cmdMonth = cmdDate.getMonth();
                const cmdYear = cmdDate.getFullYear();
                for (let i = 0; i < 5; i++) {
                    const targetMonth = (currentMonth - i + 12) % 12;
                    const targetYear = currentYear - (currentMonth - i < 0 ? 1 : 0);
                    if (cmdMonth === targetMonth && cmdYear === targetYear) {
                        const revenue = commande.LigneCommand.reduce((acc, line) => {
                            return acc + (parseFloat(line?.Prix?.prix) || 0) * line.quantiter;
                        }, 0);
                        monthlyRevenue[i] += revenue;
                    }
                }
            });
            const totalRevenue = monthlyRevenue.reduce((acc, val) => acc + val, 0);
            return {
                total: totalRevenue,
                monthly: monthlyRevenue.reverse(),
            };
        };
        this.getOrderStats = (commandes) => {
            const stats = {
                pending: 0,
                shipped: 0,
                delivered: 0,
                cancelled: 0,
            };
            commandes.forEach((commande) => {
                switch (commande.etat) {
                    case 'ATTENTE':
                        stats.pending += 1;
                        break;
                    case 'VALIDER':
                        stats.shipped += 1;
                        break;
                    case 'LIVRER':
                        stats.delivered += 1;
                        break;
                    case 'ANNULER':
                        stats.cancelled += 1;
                        break;
                    default:
                        break;
                }
            });
            return stats;
        };
    }
    async create(createBoutiqueDto) {
        try {
            const existingByName = await this.prisma.boutique.findFirst({
                where: { nom: createBoutiqueDto.nom },
            });
            console.log(existingByName);
            if (existingByName) {
            }
            const country = await this.prisma.country.findUnique({
                where: { id: Number(createBoutiqueDto.countryId) },
            });
            if (!country) {
                throw new common_1.NotFoundException(`Country #${createBoutiqueDto.countryId} introuvable`);
            }
            const password = (0, functions_1.genererMotDePasse)(8);
            const boutique = await this.prisma.boutique.create({
                data: {
                    nom: createBoutiqueDto.nom,
                    phone: createBoutiqueDto.phone,
                    location: createBoutiqueDto.location,
                    email: createBoutiqueDto.email,
                    img: createBoutiqueDto.img,
                    description: createBoutiqueDto.description,
                    categorie: createBoutiqueDto.categorie,
                    utilisateurs: {
                        connectOrCreate: {
                            where: {
                                email: createBoutiqueDto.email,
                            },
                            create: {
                                nom: createBoutiqueDto.nom,
                                email: createBoutiqueDto.email,
                                telephone: createBoutiqueDto.phone,
                                avatar: createBoutiqueDto.img,
                                password: await (0, bcrypt_1.hash)(password, 10),
                                profile: client_1.Profile.BOUTIQUIER,
                            },
                        },
                    },
                    country: {
                        connect: {
                            id: Number(country.id),
                        },
                    },
                },
            });
            await this.mailService.sendMail([createBoutiqueDto.email], 'Les identifiant de votre boutique', (0, data_1.templateToSendShopidentyMail)(password, createBoutiqueDto.nom, createBoutiqueDto.email));
            return {
                statusCode: 201,
                message: 'Boutique créée avec succès',
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
            const boutiques = await this.prisma.boutique.findMany({
                include: {
                    country: true,
                },
            });
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
            const boutiques = await this.prisma.boutique.findMany();
            console.log(boutiques);
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
            const boutiques = await this.prisma.boutique.findMany({
                include: {
                    country: true,
                    Prix: {
                        include: {
                            produits: true,
                        },
                    },
                },
            });
            const btp = [];
            const customeBoutique = boutiques.filter((bt) => {
                let Prix = [];
                Prix = bt.Prix.map((prix) => {
                    const prixId = prix.id;
                    const produits = { ...prix.produits, quantiter: prix.quantiter };
                    const tt = {
                        ...bt,
                        prix: prix.prix,
                        ...produits,
                        prixId,
                        boutique: { ...bt },
                    };
                    return tt;
                });
                btp.push(bt);
                return true;
            });
            console.log(btp);
            return {
                statusCode: 200,
                data: customeBoutique.filter((rr) => rr != null),
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
    async getStatistic(id) {
        try {
            console.log('====================');
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth() - 4, 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const commandes = await this.prisma.commande.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                    LigneCommand: {
                        some: {
                            Prix: {
                                boutiqueId: id,
                            },
                        },
                    },
                },
                include: {
                    LigneCommand: {
                        include: {
                            Prix: true,
                        },
                    },
                },
            });
            const sales = this.getSalesStats(commandes);
            const orders = this.getOrderStats(commandes);
            const revenue = this.getRevenueStats(commandes);
            return {
                statusCode: 200,
                data: { sales, orders, revenue },
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
                fs.unlinkSync('uploads/' + existing.img);
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
            console.log(updateBoutiqueDto.img, '|', existing.img);
            console.log(updateBoutiqueDto.img, '|', updated.img, '|', existing.img);
            return {
                statusCode: 200,
                data: updated,
            };
        }
        catch (error) {
            console.log(error);
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
        try {
            const deleted = await this.prisma.boutique.deleteMany({
                where: { id: Number(id) },
            });
            if (boutique.img) {
                try {
                    fs.unlinkSync('uploads/' + boutique.img);
                }
                catch (err) {
                }
            }
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService,
        users_service_1.UsersService])
], BoutiqueService);
//# sourceMappingURL=boutique.service.js.map