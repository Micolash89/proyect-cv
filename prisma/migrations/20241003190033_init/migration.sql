-- CreateEnum
CREATE TYPE "EstudioEstadoEnum" AS ENUM ('COMPLETADO', 'INCOMPLETO', 'PROCESO');

-- CreateEnum
CREATE TYPE "EstudioTipoEnum" AS ENUM ('PRIMARIO', 'SECUNDARIO', 'TERCEARIO', 'UNIVERSITARIO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "linkedin" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudio" (
    "id" SERIAL NOT NULL,
    "carrera" TEXT NOT NULL,
    "estado" "EstudioEstadoEnum" NOT NULL,
    "tipo" "EstudioTipoEnum" NOT NULL,
    "institucion" TEXT NOT NULL,
    "fechaIngreso" TEXT NOT NULL,
    "fechaEgreso" TEXT,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Estudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "fechaInicio" TEXT NOT NULL,
    "fechaFin" TEXT,
    "descripcion" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "fechaInicio" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- AddForeignKey
ALTER TABLE "Estudio" ADD CONSTRAINT "Estudio_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
