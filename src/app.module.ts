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
import { join } from 'path';
import { PrixModule } from './prix/prix.module';
import { PanierModule } from './panier/panier.module';
import { ConfigModule } from '@nestjs/config';
import { AdresseModule } from './adresse/adresse.module';
import { CommandModule } from './command/command.module';
import { CategorieProduitModule } from './categorie-produit/categorie-produit.module';

console.log(join(__dirname, '..', 'uploads'));

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    UsersModule,
    ProduitModule,
    BoutiqueModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrixModule,
    PanierModule,
    AdresseModule,
    CommandModule,
    CategorieProduitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
