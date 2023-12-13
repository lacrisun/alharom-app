/*
  Warnings:

  - Added the required column `tipe_keuangan` to the `Financial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipeKeuangan" AS ENUM ('Pemasukan', 'Pengeluaran');

-- AlterTable
ALTER TABLE "Financial" ADD COLUMN     "tipe_keuangan" "TipeKeuangan" NOT NULL;
