/*
  Warnings:

  - The `categorie` column on the `Boutique` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `categorie` on the `Produit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telephone]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utilisateurId` to the `Panier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categorieId` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('ADMIN', 'CLIENT', 'BOUTIQUIER');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "CategorieBoutique" AS ENUM ('DETAILLANT', 'GROSSISTE');

-- CreateEnum
CREATE TYPE "EtatCommand" AS ENUM ('ANNULER', 'VALIDER', 'ATTENTE');

-- DropForeignKey
ALTER TABLE "Boutique" DROP CONSTRAINT "Boutique_userId_fkey";

-- AlterTable
ALTER TABLE "Boutique" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'NATIONAL',
ADD COLUMN     "phone" TEXT,
DROP COLUMN "categorie",
ADD COLUMN     "categorie" "CategorieBoutique" NOT NULL DEFAULT 'DETAILLANT';

-- AlterTable
ALTER TABLE "Panier" ADD COLUMN     "utilisateurId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "categorie",
ADD COLUMN     "categorieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "profile" "Profile" NOT NULL DEFAULT 'CLIENT';

-- CreateTable
CREATE TABLE "Adresse" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "quartier" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorieProduit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategorieProduit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "commandeNbr" TEXT NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "etat" "EtatCommand" NOT NULL DEFAULT 'ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneCommand" (
    "id" SERIAL NOT NULL,
    "prixId" INTEGER,
    "commandeId" INTEGER,
    "quantiter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LigneCommand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_telephone_key" ON "Utilisateur"("telephone");

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "CategorieProduit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boutique" ADD CONSTRAINT "Boutique_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panier" ADD CONSTRAINT "Panier_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommand" ADD CONSTRAINT "LigneCommand_prixId_fkey" FOREIGN KEY ("prixId") REFERENCES "Prix"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommand" ADD CONSTRAINT "LigneCommand_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE SET NULL ON UPDATE CASCADE;
