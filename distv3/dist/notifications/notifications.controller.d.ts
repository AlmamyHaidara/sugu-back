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
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    updateStatus(id: string, status: string, date: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    findUnreadByUser(userId: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
    findByUser(userId: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.NotificationStatus;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        type: import(".prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
}
