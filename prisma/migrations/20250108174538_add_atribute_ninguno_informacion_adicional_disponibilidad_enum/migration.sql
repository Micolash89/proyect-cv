/*
  Warnings:

  - Made the column `disponibilidad` on table `InformacionAdicional` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "DisponibilidadEnum" ADD VALUE 'NINGUNO';

-- AlterTable
ALTER TABLE "InformacionAdicional" ALTER COLUMN "disponibilidad" SET NOT NULL;
