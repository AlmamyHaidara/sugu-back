import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
        utilisateur: {
            Boutique: {
                nom: string;
                email: string | null;
                id: number;
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
            nom: string;
            prenom: string | null;
            email: string;
            telephone: string;
            password: string;
            profile: import("@prisma/client").$Enums.Profile;
            avatar: string | null;
            id: number;
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
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<{
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
    updateStatus(id: number, status: 'ARCHIVED' | 'READ' | 'UNREAD', date: Date): Promise<{
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
    remove(id: number): Promise<{
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
