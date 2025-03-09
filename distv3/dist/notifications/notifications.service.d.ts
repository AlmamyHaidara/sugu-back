import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<{
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
    updateStatus(id: number, status: 'ARCHIVED' | 'READ' | 'UNREAD', date: Date): Promise<{
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
    remove(id: number): Promise<{
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
