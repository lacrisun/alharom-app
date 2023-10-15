/*
  Warnings:

  - Added the required column `didaftarkan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "didaftarkan" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "nama_lengkap" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nomor_telepon" VARCHAR(64) NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nomor_telepon" VARCHAR(64) NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "password" VARCHAR(64) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
