/*
  Warnings:

  - The values [UNIVERSITARIO] on the enum `EstudioTipoEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstudioTipoEnum_new" AS ENUM ('PRIMARIO', 'SECUNDARIO', 'TERCIARIO', 'UNIVERSIDAD');
ALTER TABLE "Estudio" ALTER COLUMN "tipo" TYPE "EstudioTipoEnum_new" USING ("tipo"::text::"EstudioTipoEnum_new");
ALTER TYPE "EstudioTipoEnum" RENAME TO "EstudioTipoEnum_old";
ALTER TYPE "EstudioTipoEnum_new" RENAME TO "EstudioTipoEnum";
DROP TYPE "EstudioTipoEnum_old";
COMMIT;
