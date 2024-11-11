/*
  Warnings:

  - Added the required column `office` to the `InformacionAdiconal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InformacionAdiconal" ADD COLUMN     "office" TEXT NOT NULL;
