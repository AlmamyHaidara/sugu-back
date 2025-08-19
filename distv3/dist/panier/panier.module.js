"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanierModule = void 0;
const common_1 = require("@nestjs/common");
const panier_service_1 = require("./panier.service");
const panier_controller_1 = require("./panier.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let PanierModule = class PanierModule {
};
exports.PanierModule = PanierModule;
exports.PanierModule = PanierModule = __decorate([
    (0, common_1.Module)({
        controllers: [panier_controller_1.PanierController],
        providers: [panier_service_1.PanierService, prisma_service_1.PrismaService],
    })
], PanierModule);
//# sourceMappingURL=panier.module.js.map