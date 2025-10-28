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
exports.ParticulierController = void 0;
const common_1 = require("@nestjs/common");
const particulier_service_1 = require("./particulier.service");
const create_particulier_dto_1 = require("./dto/create-particulier.dto");
const update_particulier_dto_1 = require("./dto/update-particulier.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const SearchProduits_dto_1 = require("../produit/dto/SearchProduits.dto");
const constants_1 = require("../auth/constants");
const fs_1 = require("fs");
let ParticulierController = class ParticulierController {
    constructor(particulierService) {
        this.particulierService = particulierService;
    }
    async create(files, createParticulierDto) {
        console.log(files);
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('Image file is required');
        }
        const imgs = files.map((file) => file.path.split('uploads/')[1] || file.path.split('uploads\\')[1]);
        return await this.particulierService.create({
            ...createParticulierDto,
            prodImg: imgs,
        });
    }
    async findAll(userId) {
        return await this.particulierService.findAllProducts(+userId);
    }
    async findAllApprovedProducts(query) {
        return await this.particulierService.findAllApprovedProducts(query);
    }
    async findOne(userId, produitId) {
        return await this.particulierService.findProductById(+userId, +produitId);
    }
    async findAllProductInValidation() {
        return await this.particulierService.findAllProduitsInValidation();
    }
    async validateProduct(produitId, status, comment) {
        return await this.particulierService.validateProduct(+produitId, status, comment);
    }
    async update(files, updateParticulierDto) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('Image file is required');
        }
        const imgs = files.map((file) => file.path.split('uploads/')[1] || file.path.split('uploads\\')[1]);
        return await this.particulierService.updateProduct({ ...updateParticulierDto }, files);
    }
    async revalidateProduct(produitId) {
        return await this.particulierService.revalidateProduct(+produitId);
    }
    remove(userId, produitId) {
        return this.particulierService.deleteProduct(+userId, +produitId);
    }
};
exports.ParticulierController = ParticulierController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('prodImg', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                const filename = `particulier-${uniqueSuffix}${ext}`;
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
        create_particulier_dto_1.CreateParticulierDto]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "findAll", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('/product/approved'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SearchProduits_dto_1.SearchProduitsDto]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "findAllApprovedProducts", null);
__decorate([
    (0, common_1.Get)(':userId/:produitId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('produitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/products/in/validation/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "findAllProductInValidation", null);
__decorate([
    (0, common_1.Patch)('/validation/:produitId/:status'),
    __param(0, (0, common_1.Param)('produitId')),
    __param(1, (0, common_1.Param)('status')),
    __param(2, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "validateProduct", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('prodImg', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = process.env.PRODUIT_UPLOAD_DIR || './uploads/particulier';
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                const filename = `particulier-${uniqueSuffix}${ext}`;
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
        update_particulier_dto_1.UpdateParticulierDto]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/products/in/revalidation/:produitId'),
    __param(0, (0, common_1.Param)('produitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParticulierController.prototype, "revalidateProduct", null);
__decorate([
    (0, common_1.Delete)(':userId/:produitId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('produitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ParticulierController.prototype, "remove", null);
exports.ParticulierController = ParticulierController = __decorate([
    (0, common_1.Controller)('particulier'),
    __metadata("design:paramtypes", [particulier_service_1.ParticulierService])
], ParticulierController);
//# sourceMappingURL=particulier.controller.js.map