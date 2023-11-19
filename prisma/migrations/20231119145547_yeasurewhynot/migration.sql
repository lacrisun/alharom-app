/*
  Warnings:

  - You are about to drop the column `role` on the `Accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pembayaran` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sisa_bayar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "role",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "sisa_pembayaran" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pembayaran" VARCHAR(20) NOT NULL,
ADD COLUMN     "sisa_bayar" VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "nama_lengkap" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "nomor_telepon" VARCHAR(50) NOT NULL,
    "tanggal_lahir" VARCHAR(20) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "tanggal_bergabung" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Roles" NOT NULL DEFAULT 'Mentor',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
