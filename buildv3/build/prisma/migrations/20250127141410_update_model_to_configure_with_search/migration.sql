/*
  Warnings:

  - Changed the type of `prix` on the `Prix` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Boutique" ADD COLUMN     "countryId" INTEGER;

-- AlterTable
ALTER TABLE "Prix" DROP COLUMN "prix",
ADD COLUMN     "prix" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isoCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Boutique" ADD CONSTRAINT "Boutique_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
