import {
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsJSON,
} from 'class-validator';

// On redéfinit les enums TypeScript
export enum NotificationType {
  INFO = 'INFO',
  ORDER = 'ORDER',
  PAYMENT = 'PAYMENT',
  WARNING = 'WARNING',
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED',
}

// DTO principal
export class CreateNotificationDto {
  @IsInt()
  userId: number;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  message: string;

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus = NotificationStatus.UNREAD;

  @IsOptional()
  //   @IsDateString()
  @IsString()
  readAt?: string = new Date().toDateString();
}
