/*
  Warnings:

  - Added the required column `ubicacion` to the `Estudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ubicacion` to the `Experiencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudio" ADD COLUMN     "ubicacion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experiencia" ADD COLUMN     "ubicacion" TEXT NOT NULL;
