/*
  Warnings:

  - A unique constraint covering the columns `[clientId,email]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lead_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lead_clientId_email_key" ON "Lead"("clientId", "email");
