"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const prisma_service_1 = require("./prisma/prisma.service");
const produit_module_1 = require("./produit/produit.module");
const boutique_module_1 = require("./boutique/boutique.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const prix_module_1 = require("./prix/prix.module");
const panier_module_1 = require("./panier/panier.module");
const config_1 = require("@nestjs/config");
const adresse_module_1 = require("./adresse/adresse.module");
const command_module_1 = require("./command/command.module");
const categorie_produit_module_1 = require("./categorie-produit/categorie-produit.module");
const search_module_1 = require("./search/search.module");
const country_controller_1 = require("./country/country.controller");
const country_service_1 = require("./country/country.service");
const notifications_module_1 = require("./notifications/notifications.module");
const users_controller_1 = require("./users/users.controller");
const mail_module_1 = require("./mail/mail.module");
const platform_express_1 = require("@nestjs/platform-express");
const files_controller_1 = require("./files/files.controller");
const files_service_1 = require("./files/files.service");
const particulier_module_1 = require("./particulier/particulier.module");
const publicity_module_1 = require("./publicity/publicity.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            produit_module_1.ProduitModule,
            boutique_module_1.BoutiqueModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
            }),
            prix_module_1.PrixModule,
            panier_module_1.PanierModule,
            adresse_module_1.AdresseModule,
            command_module_1.CommandModule,
            categorie_produit_module_1.CategorieProduitModule,
            search_module_1.SearchModule,
            notifications_module_1.NotificationsModule,
            mail_module_1.MailModule,
            particulier_module_1.ParticulierModule,
            publicity_module_1.PublicityModule,
        ],
        controllers: [app_controller_1.AppController, country_controller_1.CountryController, users_controller_1.UsersController, files_controller_1.FilesController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            prisma_service_1.PrismaService,
            country_service_1.CountryService,
            files_service_1.FilesService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map