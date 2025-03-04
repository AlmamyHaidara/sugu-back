import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.yahoo.com',
        auth: {
          user: process.env.YAHOO_USER, // Votre adresse Yahoo
          pass: process.env.YAHOO_PASS, // Votre mot de passe ou mot de passe d'application Yahoo
        },
      },
      // defaults: {
      //   from: `"Sugu market place" ${process.env.YAHOO_USER}`,
      // },
      // template: {
      //   dir: join(__dirname, 'templates'),
      //   // Vous pouvez configurer un adaptateur de template si nécessaire
      // },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
