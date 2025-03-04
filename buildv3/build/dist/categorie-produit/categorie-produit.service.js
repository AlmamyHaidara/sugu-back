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
exports.CategorieProduitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../utils/constants");
let CategorieProduitService = class CategorieProduitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createCategorieProduitDto) {
        try {
            const isExist = this.prisma.categorieProduit.findFirst({
                where: {
                    nom: createCategorieProduitDto.nom,
                },
            });
            if (isExist) {
                new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: 'Cet catégorie de produit existe déja',
                    error: 'Existe déja',
                }, common_1.HttpStatus.CONFLICT);
            }
            this.prisma.$transaction(async (transaction) => {
                return transaction.categorieProduit.create({
                    data: createCategorieProduitDto,
                });
            });
            return 'This action adds a new categorieProduit';
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findAll() {
        try {
            return await this.prisma.categorieProduit.findMany();
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.categorieProduit.findFirst({
                where: { id },
            });
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    update(id, updateCategorieProduitDto) {
        try {
            const isExist = this.prisma.categorieProduit.findFirst({
                where: {
                    id,
                },
            });
            if (!isExist) {
                new common_1.NotFoundException();
            }
            this.prisma.categorieProduit.update({
                where: {
                    id,
                },
                data: updateCategorieProduitDto,
            });
            return `This action updates a #${id} categorieProduit`;
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
    async remove(id) {
        try {
            await this.prisma.categorieProduit.delete({
                where: { id },
            });
            return `This action removes a #${id} categorieProduit`;
        }
        catch (error) {
            console.error(error);
            (0, constants_1.ExeceptionCase)(error);
        }
    }
};
exports.CategorieProduitService = CategorieProduitService;
exports.CategorieProduitService = CategorieProduitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategorieProduitService);
//# sourceMappingURL=categorie-produit.service.js.map