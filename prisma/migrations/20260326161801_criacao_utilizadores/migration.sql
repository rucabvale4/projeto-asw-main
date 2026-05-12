-- CreateTable
CREATE TABLE "utilizador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "utilizador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilizador_email_key" ON "utilizador"("email");
