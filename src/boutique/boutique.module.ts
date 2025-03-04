import { Module } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueController } from './boutique.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PrixService } from 'src/prix/prix.service';

@Module({
  controllers: [BoutiqueController],
  providers: [
    BoutiqueService,
    PrismaService,
    UsersService,
    MailService,
    AuthService,
    PrixService,
  ],
})
export class BoutiqueModule {}
