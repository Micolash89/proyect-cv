/*
  Warnings:

  - You are about to drop the `InformacionAdiconal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InformacionAdiconal" DROP CONSTRAINT "InformacionAdiconal_idUsuario_fkey";

-- DropTable
DROP TABLE "InformacionAdiconal";

-- CreateTable
CREATE TABLE "InformacionAdicional" (
    "id" SERIAL NOT NULL,
    "licencia" TEXT NOT NULL,
    "movilidad" TEXT NOT NULL,
    "incorporacion" TEXT NOT NULL,
    "office" TEXT,
    "disponibilidad" "DisponibilidadEnum" NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "InformacionAdicional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InformacionAdicional" ADD CONSTRAINT "InformacionAdicional_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
