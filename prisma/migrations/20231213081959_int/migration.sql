/*
  Warnings:

  - Changed the type of `nominal` on the `Financial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Financial" DROP COLUMN "nominal",
ADD COLUMN     "nominal" INTEGER NOT NULL;
