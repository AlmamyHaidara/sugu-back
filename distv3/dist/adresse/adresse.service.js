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
exports.AdresseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdresseService = class AdresseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAdresseDto) {
        try {
            console.log(createAdresseDto);
            if (Object.keys(createAdresseDto).length <= 0 ||
                Object.values(createAdresseDto).length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return 'This action adds a new adresse';
            }
            const adresse = await this.prisma.$transaction(async (transaction) => {
                return transaction.adresse.create({
                    data: {
                        nom: createAdresseDto.nom,
                        quartier: createAdresseDto.quartier,
                        telephone: createAdresseDto.telephone,
                        descrition: createAdresseDto.description,
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
                return 'This action adds a new adresse';
            }
            return {
                status: 201,
                data: adresse,
            };
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
    async findAll() {
        try {
            const adresses = await this.prisma.adresse.findMany();
            return { status: 200, data: adresses || [] };
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
    async findOne(id) {
        try {
            const adresses = await this.prisma.adresse.findMany({
                where: {
                    id: id,
                },
            });
            return { status: 200, data: adresses || [] };
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
    async findOneByUserId(id) {
        try {
            const adresses = await this.prisma.adresse.findMany({
                where: {
                    userId: id,
                },
            });
            return { status: 200, data: adresses || [] };
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
    async update(id, updateAdresseDto) {
        try {
            console.log(updateAdresseDto);
            if (Object.keys(updateAdresseDto).length <= 0 ||
                Object.values(updateAdresseDto).length === 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Veuillez renseigne correctement les champs',
                    error: 'Internal Server Error',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return 'This action adds a new adresse';
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
                        descrition: updateAdresseDto.description,
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
            console.error(error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }
    async remove(id, userId) {
        try {
            const isExist = await this.prisma.adresse.findUnique({
                where: { id: id, userId: userId },
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
            console.error(error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal error',
                error: 'Internal error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }
};
exports.AdresseService = AdresseService;
exports.AdresseService = AdresseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdresseService);
//# sourceMappingURL=adresse.service.js.map