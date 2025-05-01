import { Module } from '@nestjs/common';
import { PrixService } from './prix.service';
import { PrixController } from './prix.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PrixController],
  providers: [PrixService, PrismaService],
})
export class PrixModule {}
