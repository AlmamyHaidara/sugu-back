import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [CommandController],
  providers: [
    CommandService,
    PrismaService,
    UsersService,
    PrixService,
    NotificationsService,
  ],
  imports: [MailModule],
})
export class CommandModule {}
