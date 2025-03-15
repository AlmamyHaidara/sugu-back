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
let BoutiqueController = class BoutiqueController {
    constructor(boutiqueService) {
        this.boutiqueService = boutiqueService;
    }
    create(file, createBoutiqueDto) {
        return this.boutiqueService.create({
            ...createBoutiqueDto,
            img: file.path,
        });
    }
    findAll() {
        return this.boutiqueService.findAll();
    }
    findOne(id) {
        return this.boutiqueService.findOne(+id);
    }
    findBoutiqueProduit(id) {
        return this.boutiqueService.findAllShopWithProducts(+id);
    }
    update(id, updateBoutiqueDto) {
        console.log(id);
        return this.boutiqueService.update(+id, updateBoutiqueDto);
    }
    remove(id) {
        return this.boutiqueService.remove(+id);
    }
};
exports.BoutiqueController = BoutiqueController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/boutiques',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `boutique-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_boutique_dto_1.CreateBoutiqueDto]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "create", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findOne", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)('/all-produits/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "findBoutiqueProduit", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_boutique_dto_1.UpdateBoutiqueDto]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoutiqueController.prototype, "remove", null);
exports.BoutiqueController = BoutiqueController = __decorate([
    (0, common_1.Controller)('boutique'),
    __metadata("design:paramtypes", [boutique_service_1.BoutiqueService])
], BoutiqueController);
//# sourceMappingURL=boutique.controller.js.map