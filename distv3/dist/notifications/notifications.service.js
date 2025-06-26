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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        try {
            const utilisateur = await this.prisma.utilisateur.findUnique({
                where: { id: createNotificationDto.userId },
            });
            console.log('{ id: Number(createNotificationDto.userId) }', {
                id: Number(createNotificationDto.userId),
            });
            if (!utilisateur) {
                throw new common_1.BadRequestException(`Utilisateur with ID ${createNotificationDto.userId} not found.`);
            }
            return await this.prisma.notification.create({
                data: {
                    type: createNotificationDto.type,
                    title: createNotificationDto.title,
                    message: createNotificationDto.message,
                    data: createNotificationDto.data,
                    status: createNotificationDto.status,
                    readAt: createNotificationDto.readAt
                        ? new Date(createNotificationDto.readAt)
                        : undefined,
                    utilisateur: {
                        connect: {
                            id: Number(createNotificationDto.userId),
                        },
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Une erreur est survenue lors de la création de la notification.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.notification.findMany({
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Impossible de récupérer les notifications.');
        }
    }
    async findOne(id) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
            include: {
                utilisateur: {
                    include: {
                        Boutique: true,
                    }
                }
            }
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification #${id} introuvable.`);
        }
        console.log('notification', notification);
        return notification;
    }
    async update(id, updateNotificationDto) {
        await this.findOne(id);
        try {
            const updated = await this.prisma.notification.update({
                where: { id },
                data: {
                    type: updateNotificationDto.type,
                    title: updateNotificationDto.title,
                    message: updateNotificationDto.message,
                    data: updateNotificationDto.data,
                    status: updateNotificationDto.status,
                    readAt: updateNotificationDto.readAt
                        ? new Date(updateNotificationDto.readAt)
                        : undefined,
                },
            });
            return updated;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Impossible de mettre à jour la notification #${id}.`);
        }
    }
    async updateStatus(id, status, date) {
        await this.findOne(id);
        try {
            const updated = await this.prisma.notification.update({
                where: { id },
                data: {
                    status: status,
                    readAt: date,
                },
            });
            return updated;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Impossible de mettre à jour la notification #${id}.`);
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.notification.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Impossible de supprimer la notification #${id}.`);
        }
    }
    async findUnreadByUser(userId) {
        try {
            return await this.prisma.notification.findMany({
                where: {
                    utilisateurId: userId,
                    status: create_notification_dto_1.NotificationStatus.UNREAD,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Impossible de récupérer les notifications non lues pour l'utilisateur #${userId}.`);
        }
    }
    async findByUser(userId) {
        try {
            const notifications = await this.prisma.notification.findMany({
                where: {
                    utilisateurId: userId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 20,
            });
            const customOrder = { UNREAD: 1, READ: 2, ARCHIVED: 3 };
            notifications.sort((a, b) => customOrder[a.status] - customOrder[b.status]);
            return notifications;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Impossible de récupérer les notifications non lues pour l'utilisateur #${userId}.`);
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map