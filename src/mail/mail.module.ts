import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'yahoo',
        host: process.env.YAHOO_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.YAHOO_USER,
          pass: process.env.YAHOO_PASS, // Utilisez le mot de passe d'application généré
        },
      },
      defaults: {
        from: `"Sugu" <${process.env.YAHOO_USER}>`,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
