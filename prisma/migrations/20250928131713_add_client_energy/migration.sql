/*
  Warnings:

  - Added the required column `bill` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyConsumption` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "bill" INTEGER NOT NULL,
ADD COLUMN     "energyConsumption" INTEGER NOT NULL,
ADD COLUMN     "quote" INTEGER NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
