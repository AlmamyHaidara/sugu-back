import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(to: string[], subject: string, template: string): Promise<void>;
}
