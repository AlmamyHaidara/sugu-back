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
var AdresseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdresseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdresseService = AdresseService_1 = class AdresseService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AdresseService_1.name);
    }
    async create(createAdresseDto) {
        try {
            this.logger.log('Creating a new address', createAdresseDto);
            if (Object.keys(createAdresseDto).length <= 0 ||
                Object.values(createAdresseDto).length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const adresse = await this.prisma.$transaction(async (transaction) => {
                return transaction.adresse.create({
                    data: {
                        nom: createAdresseDto.nom,
                        quartier: createAdresseDto.quartier,
                        telephone: createAdresseDto.telephone,
                        description: createAdresseDto.description,
                        utilisateurs: {
                            connect: {
                                id: createAdresseDto.userId,
                            },
                        },
                    },
                });
            });
            if (!adresse) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return {
                status: 201,
                data: adresse,
            };
        }
        catch (error) {
            this.logger.error('Error creating address', error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            this.logger.log('Fetching all addresses');
            const adresses = await this.prisma.adresse.findMany();
            return { status: 200, data: adresses || [] };
        }
        catch (error) {
            this.logger.error('Error fetching all addresses', error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            this.logger.log(`Fetching address with id ${id}`);
            const adresses = await this.prisma.adresse.findMany({
                where: {
                    id: id,
                },
            });
            return { status: 200, data: adresses || [] };
        }
        catch (error) {
            this.logger.error(`Error fetching address with id ${id}`, error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneByUserId(id) {
        try {
            this.logger.log(`Fetching addresses for user with id ${id}`);
            const adresses = await this.prisma.adresse.findMany({
                where: {
                    userId: id,
                },
            });
            return { status: 200, data: adresses || [] };
        }
        catch (error) {
            this.logger.error(`Error fetching addresses for user with id ${id}`, error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateAdresseDto) {
        try {
            this.logger.log(`Updating address with id ${id}`, updateAdresseDto);
            if (Object.keys(updateAdresseDto).length <= 0 ||
                Object.values(updateAdresseDto).length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const isExist = await this.prisma.adresse.findUnique({
                where: { id: id, userId: updateAdresseDto.userId },
                select: {
                    id: true,
                },
            });
            if (!isExist.id) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Adresse introuvable',
                    error: 'Adresse introuvable',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const adresse = await this.prisma.$transaction(async (transaction) => {
                return transaction.adresse.update({
                    where: {
                        id: id,
                    },
                    data: {
                        nom: updateAdresseDto.nom,
                        quartier: updateAdresseDto.quartier,
                        telephone: updateAdresseDto.telephone,
                        description: updateAdresseDto.description,
                        utilisateurs: {
                            connect: {
                                id: updateAdresseDto.userId,
                            },
                        },
                    },
                });
            });
            if (!adresse) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return {
                status: common_1.HttpStatus.OK,
                data: adresse,
            };
        }
        catch (error) {
            this.logger.error(`Error updating address with id ${id}`, error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const isExist = await this.prisma.adresse.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    userId: true,
                },
            });
            this.logger.log(`Removing address with id ${id} for user with id ${isExist?.userId}`);
            if (!isExist.id) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Adresse introuvable',
                    error: 'Adresse introuvable',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            await this.prisma.$transaction(async (transaction) => {
                return transaction.adresse.delete({
                    where: {
                        id: id,
                    },
                });
            });
            return {
                status: 200,
                msg: `L'adresse ${id} a ete suprimer avec succes`,
            };
        }
        catch (error) {
            console.log(error);
            this.logger.error(`Error removing address with id ${id}`, error.stack);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdresseService = AdresseService;
exports.AdresseService = AdresseService = AdresseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdresseService);
//# sourceMappingURL=adresse.service.js.map