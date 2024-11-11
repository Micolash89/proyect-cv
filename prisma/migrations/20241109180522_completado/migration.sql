/*
  Warnings:

  - The values [COMPLETADO] on the enum `EstudioEstadoEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstudioEstadoEnum_new" AS ENUM ('COMPLETO', 'INCOMPLETO', 'PROCESO');
ALTER TABLE "Estudio" ALTER COLUMN "estado" TYPE "EstudioEstadoEnum_new" USING ("estado"::text::"EstudioEstadoEnum_new");
ALTER TYPE "EstudioEstadoEnum" RENAME TO "EstudioEstadoEnum_old";
ALTER TYPE "EstudioEstadoEnum_new" RENAME TO "EstudioEstadoEnum";
DROP TYPE "EstudioEstadoEnum_old";
COMMIT;
