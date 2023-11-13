/*
  Warnings:

  - You are about to alter the column `paspor_dibuat` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "golongan_darah" SET DATA TYPE VARCHAR(6),
ALTER COLUMN "jenis_kelamin" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "paspor_dibuat" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "tanggal_lahir" SET DATA TYPE VARCHAR(16);
