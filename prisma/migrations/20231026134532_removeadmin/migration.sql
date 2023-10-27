/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tanggal_lahir` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "izin_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tanggal_bergabung" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_lahir" VARCHAR(64) NOT NULL;

-- DropTable
DROP TABLE "Admin";
