import { Logger, Module } from '@nestjs/common';
import { ParticulierService } from './particulier.service';
import { ParticulierController } from './particulier.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [ParticulierController],
  providers: [ParticulierService, PrismaService, Logger],
})
export class ParticulierModule {}
