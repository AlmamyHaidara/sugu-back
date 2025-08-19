"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdresseModule = void 0;
const common_1 = require("@nestjs/common");
const adresse_service_1 = require("./adresse.service");
const adresse_controller_1 = require("./adresse.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let AdresseModule = class AdresseModule {
};
exports.AdresseModule = AdresseModule;
exports.AdresseModule = AdresseModule = __decorate([
    (0, common_1.Module)({
        controllers: [adresse_controller_1.AdresseController],
        providers: [adresse_service_1.AdresseService, prisma_service_1.PrismaService],
    })
], AdresseModule);
//# sourceMappingURL=adresse.module.js.map