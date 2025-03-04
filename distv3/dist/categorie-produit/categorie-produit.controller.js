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
exports.CategorieProduitController = void 0;
const common_1 = require("@nestjs/common");
const categorie_produit_service_1 = require("./categorie-produit.service");
const create_categorie_produit_dto_1 = require("./dto/create-categorie-produit.dto");
const update_categorie_produit_dto_1 = require("./dto/update-categorie-produit.dto");
const constants_1 = require("../auth/constants");
let CategorieProduitController = class CategorieProduitController {
    constructor(categorieProduitService) {
        this.categorieProduitService = categorieProduitService;
    }
    create(createCategorieProduitDto) {
        return this.categorieProduitService.create(createCategorieProduitDto);
    }
    findAll() {
        return this.categorieProduitService.findAll();
    }
    findOne(id) {
        return this.categorieProduitService.findOne(+id);
    }
    update(id, updateCategorieProduitDto) {
        return this.categorieProduitService.update(+id, updateCategorieProduitDto);
    }
    remove(id) {
        return this.categorieProduitService.remove(+id);
    }
};
exports.CategorieProduitController = CategorieProduitController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categorie_produit_dto_1.CreateCategorieProduitDto]),
    __metadata("design:returntype", void 0)
], CategorieProduitController.prototype, "create", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategorieProduitController.prototype, "findAll", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategorieProduitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_categorie_produit_dto_1.UpdateCategorieProduitDto]),
    __metadata("design:returntype", void 0)
], CategorieProduitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategorieProduitController.prototype, "remove", null);
exports.CategorieProduitController = CategorieProduitController = __decorate([
    (0, common_1.Controller)('categorie-produit'),
    __metadata("design:paramtypes", [categorie_produit_service_1.CategorieProduitService])
], CategorieProduitController);
//# sourceMappingURL=categorie-produit.controller.js.map