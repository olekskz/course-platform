/*
  Warnings:

  - Added the required column `email` to the `instructors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "email" TEXT NOT NULL;
