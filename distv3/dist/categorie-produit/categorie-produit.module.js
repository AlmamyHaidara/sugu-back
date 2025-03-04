"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorieProduitModule = void 0;
const common_1 = require("@nestjs/common");
const categorie_produit_service_1 = require("./categorie-produit.service");
const categorie_produit_controller_1 = require("./categorie-produit.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let CategorieProduitModule = class CategorieProduitModule {
};
exports.CategorieProduitModule = CategorieProduitModule;
exports.CategorieProduitModule = CategorieProduitModule = __decorate([
    (0, common_1.Module)({
        controllers: [categorie_produit_controller_1.CategorieProduitController],
        providers: [categorie_produit_service_1.CategorieProduitService, prisma_service_1.PrismaService],
    })
], CategorieProduitModule);
//# sourceMappingURL=categorie-produit.module.js.map