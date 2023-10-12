/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ayahkdg` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goldarah` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hubwaris` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jkelamin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `kamar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `keldarurt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `namawaris` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notelpon` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numpaspor` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pasporex` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pasporklu` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pasportpt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pendidikn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pengumrah` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pumrah` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stkawin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tgllahir` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tmptlahir` on the `User` table. All the data in the column will be lost.
  - Added the required column `ayah_kandung` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `golongan_darah` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hubungan_waris` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keluarga_darurat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_lengkap` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_waris` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_paspor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_telpon` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paket_umrah` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paspor_dibuat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paspor_expired` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendidikan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengalaman_umrah` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_kawin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat_lahir` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat_paspor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe_kamar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "ayahkdg",
DROP COLUMN "goldarah",
DROP COLUMN "hubwaris",
DROP COLUMN "jkelamin",
DROP COLUMN "kamar",
DROP COLUMN "keldarurt",
DROP COLUMN "nama",
DROP COLUMN "namawaris",
DROP COLUMN "notelpon",
DROP COLUMN "numpaspor",
DROP COLUMN "pasporex",
DROP COLUMN "pasporklu",
DROP COLUMN "pasportpt",
DROP COLUMN "pendidikn",
DROP COLUMN "pengumrah",
DROP COLUMN "pumrah",
DROP COLUMN "stkawin",
DROP COLUMN "tgllahir",
DROP COLUMN "tmptlahir",
ADD COLUMN     "ayah_kandung" VARCHAR(64) NOT NULL,
ADD COLUMN     "golongan_darah" VARCHAR(4) NOT NULL,
ADD COLUMN     "hubungan_waris" VARCHAR(255) NOT NULL,
ADD COLUMN     "jenis_kelamin" VARCHAR(42) NOT NULL,
ADD COLUMN     "keluarga_darurat" VARCHAR(255) NOT NULL,
ADD COLUMN     "nama_lengkap" VARCHAR(64) NOT NULL,
ADD COLUMN     "nama_waris" VARCHAR(64) NOT NULL,
ADD COLUMN     "nomor_paspor" VARCHAR(255) NOT NULL,
ADD COLUMN     "nomor_telpon" VARCHAR(255) NOT NULL,
ADD COLUMN     "paket_umrah" VARCHAR(42) NOT NULL,
ADD COLUMN     "paspor_dibuat" VARCHAR(255) NOT NULL,
ADD COLUMN     "paspor_expired" VARCHAR(255) NOT NULL,
ADD COLUMN     "pendidikan" VARCHAR(64) NOT NULL,
ADD COLUMN     "pengalaman_umrah" VARCHAR(64) NOT NULL,
ADD COLUMN     "status_kawin" VARCHAR(42) NOT NULL,
ADD COLUMN     "tanggal_lahir" VARCHAR(255) NOT NULL,
ADD COLUMN     "tempat_lahir" VARCHAR(255) NOT NULL,
ADD COLUMN     "tempat_paspor" VARCHAR(255) NOT NULL,
ADD COLUMN     "tipe_kamar" VARCHAR(42) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
