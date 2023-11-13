/*
  Warnings:

  - You are about to drop the column `izin_admin` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `mentor` on the `Accounts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Mentor', 'User');

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "izin_admin",
DROP COLUMN "mentor",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'User';
