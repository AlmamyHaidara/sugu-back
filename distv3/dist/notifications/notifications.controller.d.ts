import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }>;
    findAll(): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }>;
    updateStatus(id: string, status: string, date: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }>;
    findUnreadByUser(userId: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }[]>;
    findByUser(userId: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string | null;
        readAt: Date | null;
        utilisateurId: number;
    }[]>;
}
