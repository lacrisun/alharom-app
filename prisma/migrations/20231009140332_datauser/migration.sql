/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tgllahir` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pasporex` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pasporklu` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatPay" AS ENUM ('LUNAS', 'BELUM_LUNAS');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "paystatus" "StatPay" NOT NULL DEFAULT 'BELUM_LUNAS',
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "tgllahir",
ADD COLUMN     "tgllahir" DATE NOT NULL,
DROP COLUMN "pasporex",
ADD COLUMN     "pasporex" DATE NOT NULL,
DROP COLUMN "pasporklu",
ADD COLUMN     "pasporklu" DATE NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
