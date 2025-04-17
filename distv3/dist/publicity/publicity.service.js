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
let PublicityService = class PublicityService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
    create(createPublicityDto) {
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
            this.logger.error(`Erreur lors de la validation: ${error.message}`);
            throw new Error('Erreur lors de la validation du produit');
        }
    }
    findAll() {
        return `This action returns all publicity`;
    }
    findOne(id) {
        return `This action returns a #${id} publicity`;
    }
    update(id, updatePublicityDto) {
        return `This action updates a #${id} publicity`;
    }
    remove(id) {
        return `This action removes a #${id} publicity`;
    }
};
exports.PublicityService = PublicityService;
exports.PublicityService = PublicityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_copy_1.PrismaService,
        common_1.Logger])
], PublicityService);
//# sourceMappingURL=publicity.service.js.map