import { Logger, Module } from '@nestjs/common';
import { PublicityService } from './publicity.service';
import { PublicityController } from './publicity.controller';
import { PrismaService } from 'src/prisma/prisma.service copy';

@Module({
  controllers: [PublicityController],
  providers: [PublicityService, PrismaService, Logger],
})
export class PublicityModule {}
