-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);
