import { Module } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueController } from './boutique.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoutiqueController],
  providers: [BoutiqueService, PrismaService],
})
export class BoutiqueModule {}
