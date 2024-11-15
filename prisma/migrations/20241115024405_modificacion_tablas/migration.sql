/*
  Warnings:

  - You are about to drop the column `idiomas` on the `Idiomas` table. All the data in the column will be lost.
  - Made the column `fechaEgreso` on table `Estudio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFin` on table `Experiencia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `office` on table `InformacionAdicional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Curso" ALTER COLUMN "nombre" SET DEFAULT '',
ALTER COLUMN "institucion" SET DEFAULT '',
ALTER COLUMN "fechaInicio" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Estudio" ALTER COLUMN "institucion" SET DEFAULT '',
ALTER COLUMN "fechaIngreso" SET DEFAULT '',
ALTER COLUMN "fechaEgreso" SET NOT NULL,
ALTER COLUMN "fechaEgreso" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Experiencia" ALTER COLUMN "puesto" SET DEFAULT '',
ALTER COLUMN "fechaInicio" SET DEFAULT '',
ALTER COLUMN "fechaFin" SET NOT NULL,
ALTER COLUMN "fechaFin" SET DEFAULT '',
ALTER COLUMN "descripcion" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Idiomas" DROP COLUMN "idiomas",
ADD COLUMN     "idioma" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "InformacionAdicional" ALTER COLUMN "licencia" SET DEFAULT '',
ALTER COLUMN "movilidad" SET DEFAULT '',
ALTER COLUMN "incorporacion" SET DEFAULT '',
ALTER COLUMN "office" SET NOT NULL,
ALTER COLUMN "office" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dni" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "orientacionCV" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "visto" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "nombre" SET DEFAULT '',
ALTER COLUMN "apellido" SET DEFAULT '',
ALTER COLUMN "telefono" SET DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "ciudad" SET DEFAULT '',
ALTER COLUMN "provincia" SET DEFAULT '',
ALTER COLUMN "linkedin" SET NOT NULL,
ALTER COLUMN "linkedin" SET DEFAULT '';
