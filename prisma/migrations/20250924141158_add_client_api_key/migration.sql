/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "apiKey" TEXT NOT NULL DEFAULT '123';

-- CreateIndex
CREATE UNIQUE INDEX "Client_apiKey_key" ON "Client"("apiKey");
