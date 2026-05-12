/*
  Warnings:

  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilizador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "produto";

-- DropTable
DROP TABLE "utilizador";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "pontos_xperiencia" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Squad" (
    "id" SERIAL NOT NULL,
    "nomeSquad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Squad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Planeamento',
    "squadId" INTEGER NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
