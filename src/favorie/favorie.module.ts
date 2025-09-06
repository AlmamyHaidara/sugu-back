import { Module } from '@nestjs/common';
import { FavorieService } from './favorie.service';
import { FavorieController } from './favorie.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FavorieController],
  providers: [FavorieService, PrismaService],
})
export class FavorieModule {}
