import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';

@Module({
  controllers: [CommandController],
  providers: [CommandService, PrismaService, UsersService, PrixService],
})
export class CommandModule {}
