-- AlterTable
ALTER TABLE `Boutique` MODIFY `location` ENUM('NATIONAL', 'INTERNATIONAL', 'PARTICULIER') NOT NULL DEFAULT 'NATIONAL';
