/*
  Warnings:

  - You are about to drop the column `pontos_xperiencia` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "data_hora" TIMESTAMP(3),
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "num_participantes" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pontos_xperiencia",
ADD COLUMN     "pontos_experiencia" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Participation" (
    "id" SERIAL NOT NULL,
    "rsvp_status" TEXT NOT NULL,
    "validacao" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" SERIAL NOT NULL,
    "imagem_url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_limite" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Ativa',
    "squadId" INTEGER NOT NULL,
    "criadorId" INTEGER NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "poll_option" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SquadToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SquadToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AchievementToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AchievementToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SquadToUser_B_index" ON "_SquadToUser"("B");

-- CreateIndex
CREATE INDEX "_AchievementToUser_B_index" ON "_AchievementToUser"("B");

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SquadToUser" ADD CONSTRAINT "_SquadToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Squad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SquadToUser" ADD CONSTRAINT "_SquadToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
