/*
  Warnings:

  - You are about to drop the column `LightText` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `logUrl` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `progresShadow` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `showAverage` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "LightText",
DROP COLUMN "logUrl",
DROP COLUMN "progresShadow",
DROP COLUMN "showAverage",
ADD COLUMN     "LightTextColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "logoUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "progresShadowColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "showAvgLine" BOOLEAN NOT NULL DEFAULT true;
