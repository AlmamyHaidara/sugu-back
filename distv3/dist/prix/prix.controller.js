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
exports.PrixController = void 0;
const common_1 = require("@nestjs/common");
const prix_service_1 = require("./prix.service");
const create_prix_dto_1 = require("./dto/create-prix.dto");
const update_prix_dto_1 = require("./dto/update-prix.dto");
let PrixController = class PrixController {
    constructor(prixService) {
        this.prixService = prixService;
    }
    create(createPrixDto) {
        return this.prixService.create(createPrixDto);
    }
    findAll() {
        return this.prixService.findAll();
    }
    findOne(id, produitId, boutiqueId) {
        return this.prixService.findOne(+id, +produitId, +boutiqueId);
    }
    update(id, updatePrixDto) {
        return this.prixService.update(+id, updatePrixDto);
    }
    remove(id) {
        return this.prixService.remove(+id);
    }
};
exports.PrixController = PrixController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prix_dto_1.CreatePrixDto]),
    __metadata("design:returntype", void 0)
], PrixController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrixController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('produitId')),
    __param(2, (0, common_1.Query)('boutiqueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PrixController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prix_dto_1.UpdatePrixDto]),
    __metadata("design:returntype", void 0)
], PrixController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrixController.prototype, "remove", null);
exports.PrixController = PrixController = __decorate([
    (0, common_1.Controller)('prix'),
    __metadata("design:paramtypes", [prix_service_1.PrixService])
], PrixController);
//# sourceMappingURL=prix.controller.js.map