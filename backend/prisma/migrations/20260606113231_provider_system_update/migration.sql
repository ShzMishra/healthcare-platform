/*
  Warnings:

  - You are about to drop the column `verified` on the `Provider` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProviderStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "verified",
ADD COLUMN     "status" "ProviderStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
