// mail.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { templateToSendShopidentyMail } from './data';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: any;
  constructor(private readonly mailService: MailerService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  sendMail(to: string[], subject: string, template: string) {
    this.mailService.sendMail({
      from: 'Sugu <almamyh27@gmail.com>',
      to: to,
      subject: subject,
      html: template,
    });
  }
  private async send(to: string[], subject: string, template: string) {
    const sendData = {
      from: 'Support <sugu.support@codecraft.ml>',
      to: to,
      subject: subject,
      html: template,
    };
    const { data, error } = await this.resend.emails.send({ ...sendData });

    if (error) {
      console.error("Erreur lors de l'envoi du mail :", error);
      // Vous pouvez aussi lever l'erreur pour être attrapé plus haut
      throw new BadRequestException("Erreur lors de l'envoi du mail.");
    }
    return data;
  }
  async sendShopLogin(email: string, password: string, shopName: string) {
    try {
      const data = await this.sendMail(
        [email],
        `Veuillez récevoire les identifiant de votre boutique: ${shopName}`,
        templateToSendShopidentyMail(password, shopName, email),
      );

      console.log(data);
    } catch (error) {
      console.log(error);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        "Une erreur est survenue lors de l'envoie du mail.",
      );
    }

    // text: `Veuillez récevoire les identifiant de votre boutique: ${shopName}`,
    // await this.mailerService.sendMail({
    //   to: email,
    //   subject: 'Les identifiant de votre boutique',
    //   text: `Veuillez récevoire les identifiant de votre boutique: ${shopName}`,
    //   html: templateToSendShopidentyMail(password, shopName, email),
    // });
  }
}
