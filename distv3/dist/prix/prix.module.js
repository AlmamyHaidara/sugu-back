"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrixModule = void 0;
const common_1 = require("@nestjs/common");
const prix_service_1 = require("./prix.service");
const prix_controller_1 = require("./prix.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let PrixModule = class PrixModule {
};
exports.PrixModule = PrixModule;
exports.PrixModule = PrixModule = __decorate([
    (0, common_1.Module)({
        controllers: [prix_controller_1.PrixController],
        providers: [prix_service_1.PrixService, prisma_service_1.PrismaService],
    })
], PrixModule);
//# sourceMappingURL=prix.module.js.map