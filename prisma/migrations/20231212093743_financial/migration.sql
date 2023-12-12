-- CreateTable
CREATE TABLE "Financial" (
    "id" TEXT NOT NULL,
    "judul_keuangan" VARCHAR(64) NOT NULL,
    "nominal" INTEGER NOT NULL,
    "data_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Financial_pkey" PRIMARY KEY ("id")
);
