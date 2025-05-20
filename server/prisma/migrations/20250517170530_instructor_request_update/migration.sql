/*
  Warnings:

  - You are about to drop the `InstructorRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InstructorRequest";

-- CreateTable
CREATE TABLE "instructor_requests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructor_requests_pkey" PRIMARY KEY ("id")
);
