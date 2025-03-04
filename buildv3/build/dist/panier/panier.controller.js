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
exports.PanierController = void 0;
const common_1 = require("@nestjs/common");
const panier_service_1 = require("./panier.service");
let PanierController = class PanierController {
    constructor(panierService) {
        this.panierService = panierService;
    }
    addToCart(addToCartDto) {
        return this.panierService.addToCart(addToCartDto);
    }
    getCart(boutiqueId) {
        return this.panierService.getCart(+boutiqueId);
    }
    getCartByUser(utilisateurId) {
        return this.panierService.getCartByUser(+utilisateurId);
    }
    updateCartItem(id, updateCartDto) {
        return this.panierService.updateCartItem(+id, updateCartDto.count);
    }
    removeFromCart(id) {
        return this.panierService.removeFromCart(+id);
    }
    emptyCart(boutiqueId) {
        return this.panierService.emptyCart(+boutiqueId);
    }
};
exports.PanierController = PanierController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(':boutiqueId'),
    __param(0, (0, common_1.Param)('boutiqueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "getCart", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('utilisateurId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "getCartByUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)('/empty/:boutiqueId'),
    __param(0, (0, common_1.Param)('boutiqueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PanierController.prototype, "emptyCart", null);
exports.PanierController = PanierController = __decorate([
    (0, common_1.Controller)('panier'),
    __metadata("design:paramtypes", [panier_service_1.PanierService])
], PanierController);
//# sourceMappingURL=panier.controller.js.map