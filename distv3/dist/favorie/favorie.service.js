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
exports.FavorieService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavorieService = class FavorieService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createFavorieDto) {
        try {
            return 'This action adds a new favorie';
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Une erreur est survenue lors de la création de la notification.');
        }
    }
    findAll() {
        return `This action returns all favorie`;
    }
    findOne(id) {
        return `This action returns a #${id} favorie`;
    }
    update(id, updateFavorieDto) {
        return `This action updates a #${id} favorie`;
    }
    remove(id) {
        return `This action removes a #${id} favorie`;
    }
};
exports.FavorieService = FavorieService;
exports.FavorieService = FavorieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavorieService);
//# sourceMappingURL=favorie.service.js.map