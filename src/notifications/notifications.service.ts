import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateNotificationDto,
  NotificationStatus,
} from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(createNotificationDto: CreateNotificationDto) {
    try {

      // Validate that the utilisateur exists
      const utilisateur = await this.prisma.utilisateur.findUnique({
        where: { id: createNotificationDto.userId },
      });
      console.log('{ id: Number(createNotificationDto.userId) }', {
        id: Number(createNotificationDto.userId),
      });
      if (!utilisateur) {
        throw new BadRequestException(
          `Utilisateur with ID ${createNotificationDto.userId} not found.`,
        );
      }

      // Create the notification
      return await this.prisma.notification.create({
        data: {
          type: createNotificationDto.type,
          title: createNotificationDto.title,
          message: createNotificationDto.message,
          data: createNotificationDto.data,
          status: createNotificationDto.status, // si non fourni => default UNREAD géré par Prisma
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
    } catch (error) {
      console.log(error);

      // Handle specific Prisma errors, e.g., unique constraint violation, etc.
      throw new BadRequestException(
        'Une erreur est survenue lors de la création de la notification.',
      );
    }
  }

  // READ: findAll
  async findAll() {
    try {
      return await this.prisma.notification.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new BadRequestException(
        'Impossible de récupérer les notifications.',
      );
    }
  }

  // READ: findOne
  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include:{
        utilisateur:{
          include:{
            Boutique:true,
            
          }
        }
      }
    });

    if (!notification) {
      throw new NotFoundException(`Notification #${id} introuvable.`);
    }
    console.log('notification', notification);

    return notification;
  }

  // UPDATE
  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    // Vérifier existence
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
    } catch (error: any) {
      throw new BadRequestException(
        `Impossible de mettre à jour la notification #${id}.`,
      );
    }
  }

  async updateStatus(
    id: number,
    status: 'ARCHIVED' | 'READ' | 'UNREAD',
    date: Date,
  ) {
    // Vérifier existence
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
    } catch (error: any) {
      throw new BadRequestException(
        `Impossible de mettre à jour la notification #${id}.`,
      );
    }
  }

  // DELETE
  async remove(id: number) {
    // Vérifier existence
    await this.findOne(id);

    try {
      return await this.prisma.notification.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(
        `Impossible de supprimer la notification #${id}.`,
      );
    }
  }

  async findUnreadByUser(userId: number) {
    try {
      return await this.prisma.notification.findMany({
        where: {
          utilisateurId: userId,
          status: NotificationStatus.UNREAD, // ou ton critère
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Impossible de récupérer les notifications non lues pour l'utilisateur #${userId}.`,
      );
    }
  }

  async findByUser(userId: number) {
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

      // Définir l'ordre personnalisé pour les statuts
      const customOrder = { UNREAD: 1, READ: 2, ARCHIVED: 3 };

      // Trier les notifications selon l'ordre personnalisé
      notifications.sort(
        (a, b) => customOrder[a.status] - customOrder[b.status],
      );

      return notifications;
    } catch (error) {
      throw new BadRequestException(
        `Impossible de récupérer les notifications non lues pour l'utilisateur #${userId}.`,
      );
    }
  }
}
