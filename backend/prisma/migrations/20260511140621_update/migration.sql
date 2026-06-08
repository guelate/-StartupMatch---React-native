/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('FOUNDER', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "SwipeDirection" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "SwipeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "founderId" TEXT NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionSwipe" (
    "id" TEXT NOT NULL,
    "direction" "SwipeDirection" NOT NULL,
    "status" "SwipeStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developerId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,

    CONSTRAINT "MissionSwipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileSwipe" (
    "id" TEXT NOT NULL,
    "direction" "SwipeDirection" NOT NULL,
    "status" "SwipeStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "founderId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,

    CONSTRAINT "ProfileSwipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developerId" TEXT NOT NULL,
    "founderId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MissionSwipe_developerId_missionId_key" ON "MissionSwipe"("developerId", "missionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileSwipe_founderId_developerId_key" ON "ProfileSwipe"("founderId", "developerId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_developerId_missionId_key" ON "Match"("developerId", "missionId");

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionSwipe" ADD CONSTRAINT "MissionSwipe_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionSwipe" ADD CONSTRAINT "MissionSwipe_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileSwipe" ADD CONSTRAINT "ProfileSwipe_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileSwipe" ADD CONSTRAINT "ProfileSwipe_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
