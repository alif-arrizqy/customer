/*
  Warnings:

  - Added the required column `transaction_date` to the `point_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `point_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "point_details" ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_type" TEXT NOT NULL;
