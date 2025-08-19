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
exports.PublicityController = void 0;
const common_1 = require("@nestjs/common");
const publicity_service_1 = require("./publicity.service");
const create_publicity_dto_1 = require("./dto/create-publicity.dto");
const update_publicity_dto_1 = require("./dto/update-publicity.dto");
const create_publicity_approved_product_dto_1 = require("./dto/create-publicity-approved-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const constants_1 = require("../auth/constants");
let PublicityController = class PublicityController {
    constructor(publicityService) {
        this.publicityService = publicityService;
    }
    approved(createPublicityDto) {
        return this.publicityService.validateProduct(createPublicityDto.adminId, createPublicityDto.produitId, createPublicityDto.isApproved, createPublicityDto.comment);
    }
    create(createPublicityDto, file) {
        if (file.path.split('uploads/')[1] || file.path.split('uploads\\')[1]) {
            return this.publicityService.create({
                ...createPublicityDto,
                img: file.path.split('uploads/')[1] || file.path.split('uploads\\')[1],
            });
        }
        else {
            return this.publicityService.create(createPublicityDto);
        }
    }
    findAll() {
        return this.publicityService.findAll();
    }
    findAllEnabke() {
        return this.publicityService.findAllEnabke();
    }
    findOne(id) {
        return this.publicityService.findOne(+id);
    }
    async update(id, updatePublicityDto, file) {
        console.log('file', file);
        const offre = await this.publicityService.update(+id, updatePublicityDto, file);
        return {
            statusCode: 200,
            data: offre,
            message: `L'offre special ${id} a ete mise a jours avec succes`,
        };
    }
    remove(id) {
        return this.publicityService.remove(+id);
    }
};
exports.PublicityController = PublicityController;
__decorate([
    (0, common_1.Post)('/approved'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publicity_approved_product_dto_1.CreatePublicityApprovedProductDto]),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "approved", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = process.env.PUBLICITY_UPLOAD_DIR || './uploads/publicity';
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                const filename = `publicity-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|mov|avi|webm)$/i)) {
                return callback(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publicity_dto_1.CreatePublicityDto, Object]),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "findAll", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "findAllEnabke", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const uploadPath = process.env.PUBLICITY_UPLOAD_DIR || './uploads/publicity';
                callback(null, uploadPath);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname).toLowerCase();
                const filename = `publicity-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|mov|avi|webm)$/i)) {
                return callback(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_publicity_dto_1.UpdatePublicityDto, Object]),
    __metadata("design:returntype", Promise)
], PublicityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicityController.prototype, "remove", null);
exports.PublicityController = PublicityController = __decorate([
    (0, common_1.Controller)('publicity'),
    __metadata("design:paramtypes", [publicity_service_1.PublicityService])
], PublicityController);
//# sourceMappingURL=publicity.controller.js.map