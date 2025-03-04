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
exports.CommandService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const prix_service_1 = require("../prix/prix.service");
let CommandService = class CommandService {
    constructor(prisma, user, prix) {
        this.prisma = prisma;
        this.user = user;
        this.prix = prix;
    }
    async create(createCommandDto) {
        try {
            const usr = await this.user.findOneById(createCommandDto.usetilisateurId);
            if (!usr || !usr.id) {
                throw new Error('Utilisateur non trouvé.');
            }
            const prixIds = createCommandDto.ligneCommands.map((lc) => lc.prixId);
            const prixExistants = await this.prisma.prix.findMany({
                where: { id: { in: prixIds } },
                select: { id: true },
            });
            if (prixExistants.length !== prixIds.length) {
                throw new Error('Certains prix associés aux lignes de commande sont introuvables.');
            }
            const result = await this.prisma.$transaction(async (prisma) => {
                const cmd = await prisma.commande.create({
                    data: {
                        utilisateurs: {
                            connect: {
                                id: createCommandDto.usetilisateurId,
                            },
                        },
                        etat: createCommandDto.etat,
                        commandeNbr: createCommandDto.commandeNbr,
                        LigneCommand: {
                            createMany: {
                                data: createCommandDto.ligneCommands || [],
                            },
                        },
                    },
                });
                for (const element of createCommandDto.ligneCommands) {
                    const prix = await prisma.prix.findUnique({
                        where: { id: element.prixId },
                        select: { quantiter: true },
                    });
                    if (!prix ||
                        prix.quantiter === undefined ||
                        prix.quantiter < element.quantiter) {
                        throw new Error(`Quantité insuffisante pour le prix ID ${element.prixId}.`);
                    }
                    await prisma.prix.update({
                        where: { id: element.prixId },
                        data: { quantiter: prix.quantiter - element.quantiter },
                    });
                }
                return cmd;
            });
            await this.prisma.panier.deleteMany({
                where: {
                    utilisateurId: createCommandDto.usetilisateurId,
                },
            });
            return {
                status: 201,
                data: result,
            };
        }
        catch (error) {
            console.error('Erreur lors de la création de la commande:', error);
            throw error;
        }
    }
    async findAll(userId) {
        try {
            const cmd = await this.prisma.commande.findMany({
                where: {
                    utilisateurId: userId,
                },
                select: {
                    LigneCommand: {
                        include: {
                            Prix: {
                                include: {
                                    boutiques: true,
                                    produits: true,
                                },
                            },
                        },
                    },
                },
            });
            return cmd || [];
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findOne(id, userId) {
        try {
            const cmd = await this.prisma.commande.findFirst({
                where: {
                    id: id,
                    utilisateurId: userId,
                },
                select: {
                    LigneCommand: {
                        include: {
                            Prix: {
                                include: {
                                    boutiques: true,
                                    produits: true,
                                },
                            },
                        },
                    },
                },
            });
            return {
                status: 200,
                data: cmd || {},
            };
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async updateCommandeEtat(commandeId, nouvelEtat) {
        try {
            const commande = await this.prisma.commande.findUnique({
                where: { id: commandeId },
                include: { LigneCommand: true },
            });
            if (!commande) {
                throw new Error(`Commande avec l'ID ${commandeId} introuvable.`);
            }
            if (commande.etat === nouvelEtat && nouvelEtat === nouvelEtat) {
                return {
                    status: 400,
                    message: `La commande est déjà ${nouvelEtat}.`,
                };
            }
            if (commande.etat === 'ANNULER' && nouvelEtat !== 'ANNULER') {
                await this.prisma.$transaction(async (prisma) => {
                    for (const ligne of commande.LigneCommand) {
                        const prix = await prisma.prix.findUnique({
                            where: { id: ligne.prixId },
                            select: { quantiter: true },
                        });
                        if (!prix ||
                            prix.quantiter === undefined ||
                            prix.quantiter < ligne.quantiter) {
                            throw new Error(`Quantité insuffisante pour le produit ID ${ligne.prixId}.`);
                        }
                        await prisma.prix.update({
                            where: { id: ligne.prixId },
                            data: { quantiter: prix.quantiter - ligne.quantiter },
                        });
                    }
                    await prisma.commande.update({
                        where: { id: commandeId },
                        data: { etat: nouvelEtat },
                    });
                });
                console.log(`Commande passée de l'état ANNULER à ${nouvelEtat}, quantités ajustées.`);
            }
            else if (nouvelEtat === 'ANNULER') {
                await this.prisma.$transaction(async (prisma) => {
                    for (const ligne of commande.LigneCommand) {
                        const prix = await prisma.prix.findUnique({
                            where: { id: ligne.prixId },
                            select: { quantiter: true },
                        });
                        if (!prix || prix.quantiter === undefined) {
                            throw new Error(`Impossible de restaurer la quantité pour le produit ID ${ligne.prixId}.`);
                        }
                        await prisma.prix.update({
                            where: { id: ligne.prixId },
                            data: { quantiter: prix.quantiter + ligne.quantiter },
                        });
                    }
                    await prisma.commande.update({
                        where: { id: commandeId },
                        data: { etat: nouvelEtat },
                    });
                });
                console.log(`Commande annulée avec succès et quantités restaurées.`);
            }
            else {
                await this.prisma.commande.update({
                    where: { id: commandeId },
                    data: { etat: nouvelEtat },
                });
                console.log(`État de la commande mis à jour en ${nouvelEtat}.`);
            }
            return {
                status: 200,
                message: 'Commande mise à jour avec succès.',
            };
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour de la commande :', error);
            throw error;
        }
    }
};
exports.CommandService = CommandService;
exports.CommandService = CommandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        prix_service_1.PrixService])
], CommandService);
//# sourceMappingURL=command.service.js.map