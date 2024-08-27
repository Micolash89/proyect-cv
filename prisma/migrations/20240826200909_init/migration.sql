-- CreateEnum
CREATE TYPE "EstudioEstadoEnum" AS ENUM ('TERMINADO', 'ABANDONADO', 'EN_PROCESO');

-- CreateEnum
CREATE TYPE "EstudioTipoEnum" AS ENUM ('PRIMARIO', 'SECUNDARIO', 'UNIVERSITARIO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "linkedin" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudio" (
    "id" SERIAL NOT NULL,
    "tipo" "EstudioTipoEnum" NOT NULL,
    "fechaIngreso" INTEGER NOT NULL,
    "fechaEgreso" INTEGER,
    "estado" "EstudioEstadoEnum" NOT NULL,
    "carrera" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Estudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicio" INTEGER NOT NULL,
    "fechaFin" INTEGER,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Estudio" ADD CONSTRAINT "Estudio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
