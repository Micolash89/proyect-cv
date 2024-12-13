/*
  Warnings:

  - A unique constraint covering the columns `[cvTemplateId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cvTemplateId" INTEGER;

-- CreateTable
CREATE TABLE "CVTemplate" (
    "id" SERIAL NOT NULL,
    "template" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "CVTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cvTemplateId_key" ON "User"("cvTemplateId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cvTemplateId_fkey" FOREIGN KEY ("cvTemplateId") REFERENCES "CVTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
