-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'ORDER', 'PAYMENT', 'WARNING');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
