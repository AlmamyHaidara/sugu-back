import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        utilisateur: {
            Boutique: {
                id: number;
                nom: string;
                email: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                img: string | null;
                categorie: import("@prisma/client").$Enums.CategorieBoutique;
                location: import("@prisma/client").$Enums.Location;
                phone: string | null;
                userId: number;
                countryId: number | null;
            }[];
        } & {
            id: number;
            nom: string;
            prenom: string | null;
            telephone: string;
            email: string;
            password: string;
            profile: import("@prisma/client").$Enums.Profile;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    updateStatus(id: string, status: string, date: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }>;
    findUnreadByUser(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
    findByUser(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue | null;
        status: import("@prisma/client").$Enums.NotificationStatus;
        message: string;
        type: import("@prisma/client").$Enums.NotificationType;
        utilisateurId: number;
        title: string | null;
        readAt: Date | null;
    }[]>;
}
