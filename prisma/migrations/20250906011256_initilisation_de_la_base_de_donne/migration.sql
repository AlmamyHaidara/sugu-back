-- AlterTable
ALTER TABLE `Adresse` ADD COLUMN `isdefault` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Commande` ADD COLUMN `adresseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Panier` ADD COLUMN `particulierId` INTEGER NULL,
    MODIFY `boutiqueId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Prix` ADD COLUMN `particularId` INTEGER NULL,
    MODIFY `boutiqueId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Produit` ADD COLUMN `isPublic` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `rejectionComment` TEXT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `type` ENUM('BOUTIQUE', 'PARTICULAR') NOT NULL DEFAULT 'BOUTIQUE',
    MODIFY `tags` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Favorie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `produitId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Particular` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Particular_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProduitValidationLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produitId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,
    `action` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
    `comment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `produitId` INTEGER NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OffreSpeciale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(191) NULL,
    `pourcentage` INTEGER NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorie` ADD CONSTRAINT `Favorie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorie` ADD CONSTRAINT `Favorie_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Particular` ADD CONSTRAINT `Particular_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProduitValidationLog` ADD CONSTRAINT `ProduitValidationLog_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProduitValidationLog` ADD CONSTRAINT `ProduitValidationLog_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publicite` ADD CONSTRAINT `Publicite_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prix` ADD CONSTRAINT `Prix_particularId_fkey` FOREIGN KEY (`particularId`) REFERENCES `Particular`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_adresseId_fkey` FOREIGN KEY (`adresseId`) REFERENCES `Adresse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Panier` ADD CONSTRAINT `Panier_particulierId_fkey` FOREIGN KEY (`particulierId`) REFERENCES `Particular`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
