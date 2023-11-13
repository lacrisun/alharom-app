/*
  Warnings:

  - You are about to alter the column `alamat` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(20)`.
  - You are about to alter the column `penyakit` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `nik` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.
  - You are about to alter the column `ayah_kandung` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(50)`.
  - You are about to alter the column `hubungan_waris` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `jenis_kelamin` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(42)` to `VarChar(10)`.
  - You are about to alter the column `keluarga_darurat` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `nama_lengkap` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(50)`.
  - You are about to alter the column `nama_waris` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(50)`.
  - You are about to alter the column `nomor_paspor` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.
  - You are about to alter the column `nomor_telpon` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(15)`.
  - You are about to alter the column `paspor_dibuat` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `paspor_expired` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.
  - You are about to alter the column `pendidikan` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(20)`.
  - You are about to alter the column `pengalaman_umrah` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(20)`.
  - You are about to alter the column `status_kawin` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(42)` to `VarChar(10)`.
  - You are about to alter the column `tanggal_lahir` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.
  - You are about to alter the column `tempat_lahir` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.
  - You are about to alter the column `tempat_paspor` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `tipe_kamar` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(42)` to `VarChar(10)`.
  - You are about to alter the column `didaftarkan` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "alamat" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "pekerjaan" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "penyakit" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nik" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "ayah_kandung" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "hubungan_waris" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "jenis_kelamin" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "keluarga_darurat" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nama_lengkap" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nama_waris" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "nomor_paspor" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "nomor_telpon" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "paket_umrah" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "paspor_dibuat" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "paspor_expired" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "pendidikan" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "pengalaman_umrah" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "status_kawin" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "tanggal_lahir" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "tempat_lahir" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "tempat_paspor" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "tipe_kamar" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "didaftarkan" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Mentor";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "nama_lengkap" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "nomor_telepon" VARCHAR(50) NOT NULL,
    "tanggal_lahir" VARCHAR(20) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "tanggal_bergabung" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sisa_pembayaran" VARCHAR(30) NOT NULL,
    "mentor" BOOLEAN NOT NULL DEFAULT false,
    "izin_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_username_key" ON "Accounts"("username");
