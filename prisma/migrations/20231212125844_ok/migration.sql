/*
  Warnings:

  - The `sudah_berangkat` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Departure" AS ENUM ('Belum_Berangkat', 'Sudah_Berangkat');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sudah_berangkat",
ADD COLUMN     "sudah_berangkat" "Departure" NOT NULL DEFAULT 'Belum_Berangkat';
