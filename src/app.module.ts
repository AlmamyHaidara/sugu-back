import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { ProduitModule } from './produit/produit.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { extname, join } from 'path';
import { PrixModule } from './prix/prix.module';
import { PanierModule } from './panier/panier.module';
import { ConfigModule } from '@nestjs/config';
import { AdresseModule } from './adresse/adresse.module';
import { CommandModule } from './command/command.module';
import { CategorieProduitModule } from './categorie-produit/categorie-produit.module';
import { SearchModule } from './search/search.module';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersController } from './users/users.controller';
import { MailModule } from './mail/mail.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { ParticulierModule } from './particulier/particulier.module';
import { PublicityModule } from './publicity/publicity.module';
import { MailService } from './mail/mail.service';
import { FavorieModule } from './favorie/favorie.module';
import { FavorieModule } from './favorie/favorie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    UsersModule,
    ProduitModule,
    BoutiqueModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrixModule,
    PanierModule,
    AdresseModule,
    CommandModule,
    CategorieProduitModule,
    SearchModule,
    NotificationsModule,
    MailModule,
    ParticulierModule,
    PublicityModule,
    FavorieModule,
  ],
  controllers: [
    AppController,
    CountryController,
    UsersController,
    FilesController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
    CountryService,
    FilesService,
    MailService,
  ],
})
export class AppModule {}
