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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoutiqueController = void 0;
const common_1 = require("@nestjs/common");
const boutique_service_1 = require("./boutique.service");
const create_boutique_dto_1 = require("./dto/create-boutique.dto");
const update_boutique_dto_1 = require("./dto/update-boutique.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const constants_1 = require("../auth/constants");
const roles_guard_1 = require("../auth/roles.guard");
const update_boutique_profile_dto_1 = require("./dto/update-boutique-profile.dto");
const functions_1 = require("../utils/functions");
const boutiqueStorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/boutiques',
        filename: (req, file, callback) => {
            console.log('pppppppppppppfile', file);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = (0, path_1.extname)(file.originalname);
            callback(null, `boutique-${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return callback(new Error('Seuls JPG, JPEG et PNG sont autorisés'), false);
        }
        callback(null, true);
    },
};
let BoutiqueController = class BoutiqueController {
    constructor(boutiqueService) {
        this.boutiqueService = boutiqueService;
    }
    async create(file, createBoutiqueDto) {
        console.log('createBoutiqueDto', file);
        if (file) {
            createBoutiqueDto.img = file.path.split('uploads/')[1];
        }
        console.log(file);
        const boutique = await this.boutiqueService.create(createBoutiqueDto);
        return boutique;
    }
    async findAll(req) {
        console.log('pppp');
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.boutiqueService.findAll();
        }
        return this.boutiqueService.findAll();
    }
    async findOne(id) {
        return this.boutiqueService.findOne(id);
    }
    async getStatistic(id) {
        return this.boutiqueService.getStatistic(id);
    }
    findAllWithProducts(req) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.boutiqueService.findAllShopAndProducts(userId);
        }
        return this.boutiqueService.findAllShopAndProducts();
    }
    findBoutiqueProduit(req, id) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.boutiqueService.findAllShopWithProducts(id, userId);
        }
        return this.boutiqueService.findAllShopWithProducts(id);
    }
    findBoutiqueByUserId(userId) {
        return this.boutiqueService.findAllShopByUser(userId);
    }
    async update(file, id, updateBoutiqueDto) {
        console.log('updateBoutiqueDto', file);
        if (file) {
            updateBoutiqueDto.img = file.path.split('uploads/')[1];
        }
        console.log('updateBoutiqueDto', updateBoutiqueDto.img);
        const updated = await this.boutiqueService.update(id, updateBoutiqueDto);
        return {
            message: 'Boutique mise à jour avec succès',
            data: updated,
        };
    }
    async updateProfile(id, updateBoutiqueDto, file) {
        console.log('updateBoutiqueDto', updateBoutiqueDto.img);
        if (file) {
            updateBoutiqueDto.img = file.path.split('uploads/')[1];
        }
        console.log('updateBoutiqueDto', updateBoutiqueDto.img);
        const updated = await this.boutiqueService.updateProfile(id, updateBoutiqueDto);
        return {
            message: 'Boutique mise à jour avec succès',
            data: updated,
        };
    }
    async remove(id) {
        const removed = await this.boutiqueService.remove(id);
        return {
            message: 'Boutique supprimée avec succès',
            data: removed,
        };
    }
};
exports.BoutiqueController = BoutiqueController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)('admin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', boutiqueStorage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_boutique_dto_1.CreateBoutiqueDto]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "create", null);
__decorate([
    (0, constants_1.Public)(),
    (0, roles_guard_1.Roles)('boutiquier'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('statistic/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "getStatistic", null);
__decorate([
    (0, common_1.Get)('all-with-products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findAllWithProducts", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('all-produits/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findBoutiqueProduit", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('all-produits/user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findBoutiqueByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', boutiqueStorage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_boutique_dto_1.UpdateBoutiqueDto]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('profile/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', boutiqueStorage)),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_boutique_profile_dto_1.UpdateBoutiqueProfileDto, Object]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoutiqueController.prototype, "remove", null);
exports.BoutiqueController = BoutiqueController = __decorate([
    (0, common_1.Controller)('boutique'),
    __metadata("design:paramtypes", [boutique_service_1.BoutiqueService])
], BoutiqueController);
//# sourceMappingURL=boutique.controller.js.map