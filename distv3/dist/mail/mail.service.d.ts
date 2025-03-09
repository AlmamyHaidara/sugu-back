import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailService;
    private resend;
    constructor(mailService: MailerService);
    sendMail(to: string[], subject: string, template: string): void;
    private send;
    sendShopLogin(email: string, password: string, shopName: string): Promise<void>;
}
