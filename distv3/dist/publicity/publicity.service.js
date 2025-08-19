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
exports.PublicityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_copy_1 = require("../prisma/prisma.service copy");
const fs = require("fs");
let PublicityService = class PublicityService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    async create(createPublicityDto) {
        try {
            const result = await this.prisma.offreSpeciale.create({
                data: {
                    titre: createPublicityDto.titre,
                    description: createPublicityDto.description,
                    pourcentage: Number(createPublicityDto.pourcentage),
                    dateFin: createPublicityDto.dateFin,
                    dateDebut: createPublicityDto.dateDebut,
                    img: createPublicityDto.img,
                },
            });
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Publicité créée avec succès',
                data: result,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erreur lors de la création de la publicité');
        }
    }
    approved(createPublicityDto) {
        return 'This action adds a new publicity';
    }
    async validateProduct(adminId, produitId, isApproved, comment) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const admin = await tx.utilisateur.findFirst({
                    where: {
                        id: adminId,
                        profile: 'ADMIN',
                    },
                });
                if (!admin) {
                    throw new Error('Administrateur non autorisé');
                }
                const produit = await tx.produit.findUnique({
                    where: { id: produitId },
                    include: {
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
                });
                if (!produit) {
                    throw new Error('Produit non trouvé');
                }
                const updatedProduit = await tx.produit.update({
                    where: { id: produitId },
                    data: {
                        isPublic: isApproved,
                        updatedAt: new Date(),
                    },
                });
                const utilisateurId = produit.Prix[0]?.particular?.utilisateur?.id;
                if (utilisateurId) {
                    await tx.notification.create({
                        data: {
                            utilisateurId: utilisateurId,
                            type: isApproved ? 'INFO' : 'WARNING',
                            title: isApproved ? 'Produit approuvé' : 'Produit refusé',
                            message: isApproved
                                ? `Votre produit "${produit.nom}" a été approuvé et est maintenant public`
                                : `Votre produit "${produit.nom}" a été refusé. ${comment || ''}`,
                            status: 'UNREAD',
                            data: {
                                produitId: produit.id,
                                adminId: admin.id,
                                decision: isApproved ? 'APPROVED' : 'REJECTED',
                                comment,
                            },
                        },
                    });
                }
                this.logger.log(`Produit ${produitId} ${isApproved ? 'approuvé' : 'refusé'} par admin ${adminId}`);
                return updatedProduit;
            });
        }
        catch (error) {
            console.error(error);
            this.logger.error(`Erreur lors de la validation: ${error.message}`);
            throw new Error('Erreur lors de la validation du produit');
        }
    }
    findAll() {
        return this.prisma.offreSpeciale.findMany();
    }
    findAllEnabke() {
        return this.prisma.offreSpeciale.findMany({
            where: {},
        });
    }
    findAllByDate() {
        return this.prisma.offreSpeciale.findMany({
            where: { dateFin: { lte: new Date() } },
        });
    }
    findOne(id) {
        return this.prisma.offreSpeciale.findUnique({
            where: { id },
        });
    }
    findOneByDate(date) {
        return this.prisma.offreSpeciale.findFirst({
            where: { dateDebut: { lte: date }, dateFin: { gte: date } },
        });
    }
    async update(id, updatePublicityDto, file) {
        try {
            const isExiste = await this.prisma.offreSpeciale.findFirst({
                where: { id },
            });
            if (!isExiste) {
                throw new common_1.NotFoundException(`Offre #${id} introuvable.`);
            }
            if (file && isExiste.img) {
                try {
                    fs.access('uploads/' + isExiste.img, fs.constants.F_OK, (err) => {
                        if (err) {
                            console.log("Le fichier n'existe pas.");
                        }
                        else {
                            fs.unlinkSync('uploads/' + isExiste.img);
                        }
                    });
                }
                catch (error) {
                    console.error(`Erreur de suppression de l'ancien fichier :`, error);
                }
            }
            const dataToUpdate = {
                ...updatePublicityDto,
            };
            if (file) {
                dataToUpdate.img =
                    file.path.split('uploads/')[1] || file.path.split('uploads\\')[1];
            }
            delete dataToUpdate.id;
            return await this.prisma.offreSpeciale.update({
                where: { id: Number(id) },
                data: {
                    ...dataToUpdate,
                    pourcentage: Number(dataToUpdate.pourcentage),
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException("Erreur lors de la mise à jour de l'offe");
        }
    }
    remove(id) {
        return this.prisma.offreSpeciale.delete({
            where: { id },
        });
    }
};
exports.PublicityService = PublicityService;
exports.PublicityService = PublicityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_copy_1.PrismaService,
        common_1.Logger])
], PublicityService);
//# sourceMappingURL=publicity.service.js.map