import { Module } from '@nestjs/common';
import { LoggerProvider } from './logger.providers';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule {}
