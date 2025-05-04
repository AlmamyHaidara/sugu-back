"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoutiqueModule = void 0;
const common_1 = require("@nestjs/common");
const boutique_service_1 = require("./boutique.service");
const boutique_controller_1 = require("./boutique.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
const prix_service_1 = require("../prix/prix.service");
let BoutiqueModule = class BoutiqueModule {
};
exports.BoutiqueModule = BoutiqueModule;
exports.BoutiqueModule = BoutiqueModule = __decorate([
    (0, common_1.Module)({
        controllers: [boutique_controller_1.BoutiqueController],
        providers: [
            boutique_service_1.BoutiqueService,
            prisma_service_1.PrismaService,
            users_service_1.UsersService,
            mail_service_1.MailService,
            auth_service_1.AuthService,
            prix_service_1.PrixService,
        ],
    })
], BoutiqueModule);
//# sourceMappingURL=boutique.module.js.map