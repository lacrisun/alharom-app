-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "pumrah" VARCHAR(42) NOT NULL,
    "kamar" VARCHAR(42) NOT NULL,
    "nama" VARCHAR(64) NOT NULL,
    "nik" INTEGER NOT NULL,
    "tmptlahir" VARCHAR(255) NOT NULL,
    "tgllahir" DATE NOT NULL,
    "ayahkdg" VARCHAR(64) NOT NULL,
    "numpaspor" INTEGER NOT NULL,
    "pasporex" DATE NOT NULL,
    "pasportpt" VARCHAR(255) NOT NULL,
    "pasporklu" DATE NOT NULL,
    "jkelamin" VARCHAR(42) NOT NULL,
    "goldarah" VARCHAR(4) NOT NULL,
    "stkawin" VARCHAR(42) NOT NULL,
    "namawaris" VARCHAR(64) NOT NULL,
    "hubwaris" VARCHAR(255) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "notelpon" INTEGER NOT NULL,
    "pengumrah" VARCHAR(64) NOT NULL,
    "pendidikn" VARCHAR(64) NOT NULL,
    "pekerjaan" VARCHAR(42) NOT NULL,
    "penyakit" VARCHAR(255) NOT NULL,
    "keldarurt" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nik_key" ON "User"("nik");

