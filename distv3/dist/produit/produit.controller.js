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
exports.ProduitController = void 0;
const common_1 = require("@nestjs/common");
const produit_service_1 = require("./produit.service");
const create_produit_dto_1 = require("./dto/create-produit.dto");
const update_produit_dto_1 = require("./dto/update-produit.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const constants_1 = require("../auth/constants");
const SearchProduits_dto_1 = require("./dto/SearchProduits.dto");
const functions_1 = require("../utils/functions");
const fs_1 = require("fs");
let ProduitController = class ProduitController {
    constructor(produitService) {
        this.produitService = produitService;
    }
    async create(files, createProduitDto) {
        if (!files) {
            throw new common_1.BadRequestException('Image file is required');
        }
        const imgs = files.map((file) => file.path.split('uploads/')[1] || file.path.split('uploads\\')[1]);
        const created = await this.produitService.create({
            ...createProduitDto,
            imgs,
        });
        return created;
    }
    async findAll(req, query) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.produitService.findAllProduits(query, userId);
        }
        return this.produitService.findAllProduits(query);
    }
    async findAllProductByCountryId(req, id) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.produitService.findAllProduitsByCountryId(id, userId);
        }
        return this.produitService.findAllProduitsByCountryId(id);
    }
    findAllByShopClient(req, id) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.produitService.findAllByShop(id, userId);
        }
        return this.produitService.findAllByShop(id);
    }
    findAllByShop(req, id) {
        const userId = (0, functions_1.decodejwt)(req);
        if (userId != 0) {
            return this.produitService.findAllByShop(id, userId);
        }
        return this.produitService.findAllByShop(id);
    }
    async findOne(req, id) {
        const produit = await this.produitService.findOne(id);
        if (!produit) {
            throw new common_1.NotFoundException(`Produit #${id} introuvable`);
        }
        return produit;
    }
    async update(id, file, updateProduitDto) {
        console.log(updateProduitDto);
        const updatedProduit = await this.produitService.update(id, updateProduitDto, file);
        return updatedProduit;
    }
    async remove(id) {
        const produitSupprimé = await this.produitService.remove(id);
        return {
            message: 'Produit supprimé avec succès',
            data: produitSupprimé,
        };
    }
    async getByShopIdAndUserId(shopId, userId) {
        return await this.produitService.findByUserIdAndShopId(shopId, userId);
    }
    async getByShopId(req, shopId) {
        return await this.produitService.findByShopId(shopId);
    }
};
exports.ProduitController = ProduitController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('imgs', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = process.env.PRODUIT_UPLOAD_DIR || './uploads/produits';
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                const filename = `produit-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/i)) {
                return callback(new common_1.BadRequestException('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'), false);
            }
            callback(null, true);
        },
        limits: {
            files: 10,
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_produit_dto_1.CreateProduitDto]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "create", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, SearchProduits_dto_1.SearchProduitsDto]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "findAll", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('country/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "findAllProductByCountryId", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('shop-products-client/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findAllByShopClient", null);
__decorate([
    (0, common_1.Get)('shop-products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", void 0)
], ProduitController.prototype, "findAllByShop", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/produits',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `produit-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_produit_dto_1.UpdateProduitDto]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('by-shop-id/:shopId/:userId'),
    __param(0, (0, common_1.Param)('shopId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "getByShopIdAndUserId", null);
__decorate([
    (0, common_1.Get)('by-shop-id/:shopId/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('shopId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", Promise)
], ProduitController.prototype, "getByShopId", null);
exports.ProduitController = ProduitController = __decorate([
    (0, common_1.Controller)('produit'),
    __metadata("design:paramtypes", [produit_service_1.ProduitService])
], ProduitController);
//# sourceMappingURL=produit.controller.js.map