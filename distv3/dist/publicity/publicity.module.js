"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicityModule = void 0;
const common_1 = require("@nestjs/common");
const publicity_service_1 = require("./publicity.service");
const publicity_controller_1 = require("./publicity.controller");
const prisma_service_copy_1 = require("../prisma/prisma.service copy");
let PublicityModule = class PublicityModule {
};
exports.PublicityModule = PublicityModule;
exports.PublicityModule = PublicityModule = __decorate([
    (0, common_1.Module)({
        controllers: [publicity_controller_1.PublicityController],
        providers: [publicity_service_1.PublicityService, prisma_service_copy_1.PrismaService, common_1.Logger],
    })
], PublicityModule);
//# sourceMappingURL=publicity.module.js.map