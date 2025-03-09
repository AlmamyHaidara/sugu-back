"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const data_1 = require("./data");
const resend_1 = require("resend");
let MailService = class MailService {
    constructor(mailService) {
        this.mailService = mailService;
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    sendMail(to, subject, template) {
        this.mailService.sendMail({
            from: 'Sugu <almamyh27@gmail.com>',
            to: to,
            subject: subject,
            html: template,
        });
    }
    async send(to, subject, template) {
        const sendData = {
            from: 'Support <sugu.support@codecraft.ml>',
            to: to,
            subject: subject,
            html: template,
        };
        const { data, error } = await this.resend.emails.send({ ...sendData });
        if (error) {
            console.error("Erreur lors de l'envoi du mail :", error);
            throw new common_1.BadRequestException("Erreur lors de l'envoi du mail.");
        }
        return data;
    }
    async sendShopLogin(email, password, shopName) {
        try {
            const data = await this.sendMail([email], `Veuillez récevoire les identifiant de votre boutique: ${shopName}`, (0, data_1.templateToSendShopidentyMail)(password, shopName, email));
            console.log(data);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException("Une erreur est survenue lors de l'envoie du mail.");
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map