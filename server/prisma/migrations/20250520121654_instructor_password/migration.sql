/*
  Warnings:

  - Added the required column `password` to the `instructors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "password" TEXT NOT NULL;
