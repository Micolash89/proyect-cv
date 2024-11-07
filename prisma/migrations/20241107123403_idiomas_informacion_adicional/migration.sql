-- CreateEnum
CREATE TYPE "NivelIdiomaEnum" AS ENUM ('BASICO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "DisponibilidadEnum" AS ENUM ('FULLTIME', 'PARTTIME');

-- CreateTable
CREATE TABLE "Idiomas" (
    "id" SERIAL NOT NULL,
    "idiomas" TEXT NOT NULL,
    "nivel" "NivelIdiomaEnum" NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Idiomas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformacionAdiconal" (
    "id" SERIAL NOT NULL,
    "licencia" TEXT NOT NULL,
    "movilidad" TEXT NOT NULL,
    "incorporacion" TEXT NOT NULL,
    "disponibilidad" "DisponibilidadEnum" NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "InformacionAdiconal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Idiomas" ADD CONSTRAINT "Idiomas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformacionAdiconal" ADD CONSTRAINT "InformacionAdiconal_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
