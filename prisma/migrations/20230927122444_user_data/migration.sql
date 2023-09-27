/*
  Warnings:

  - Changed the type of `nik` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `numpaspor` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `notelpon` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nik",
ADD COLUMN     "nik" INTEGER NOT NULL,
DROP COLUMN "numpaspor",
ADD COLUMN     "numpaspor" INTEGER NOT NULL,
DROP COLUMN "notelpon",
ADD COLUMN     "notelpon" INTEGER NOT NULL;
