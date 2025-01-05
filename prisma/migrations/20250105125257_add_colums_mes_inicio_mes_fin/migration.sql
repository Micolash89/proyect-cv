-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "mesInicio" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Estudio" ADD COLUMN     "mesEgreso" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mesIngreso" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Experiencia" ADD COLUMN     "mesFin" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mesInicio" TEXT NOT NULL DEFAULT '';
