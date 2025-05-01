// mail.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string[], subject: string, template: string) {
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      html: template,
    });
  }
}
