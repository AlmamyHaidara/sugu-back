export declare enum NotificationType {
    INFO = "INFO",
    ORDER = "ORDER",
    PAYMENT = "PAYMENT",
    WARNING = "WARNING"
}
export declare enum NotificationStatus {
    UNREAD = "UNREAD",
    READ = "READ",
    ARCHIVED = "ARCHIVED"
}
export declare class CreateNotificationDto {
    userId: number;
    type: NotificationType;
    title?: string;
    message: string;
    data?: any;
    status?: NotificationStatus;
    readAt?: string;
}
