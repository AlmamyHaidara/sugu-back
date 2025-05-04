"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModule = void 0;
const common_1 = require("@nestjs/common");
const command_service_1 = require("./command.service");
const command_controller_1 = require("./command.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const prix_service_1 = require("../prix/prix.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CommandModule = class CommandModule {
};
exports.CommandModule = CommandModule;
exports.CommandModule = CommandModule = __decorate([
    (0, common_1.Module)({
        controllers: [command_controller_1.CommandController],
        providers: [
            command_service_1.CommandService,
            prisma_service_1.PrismaService,
            users_service_1.UsersService,
            prix_service_1.PrixService,
            notifications_service_1.NotificationsService,
        ],
    })
], CommandModule);
//# sourceMappingURL=command.module.js.map