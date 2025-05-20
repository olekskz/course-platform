/*
  Warnings:

  - Added the required column `role` to the `instructors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "role" TEXT NOT NULL;
