import { Module } from '@nestjs/common';
import { CategorieProduitService } from './categorie-produit.service';
import { CategorieProduitController } from './categorie-produit.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CategorieProduitController],
  providers: [CategorieProduitService, PrismaService],
})
export class CategorieProduitModule {}
