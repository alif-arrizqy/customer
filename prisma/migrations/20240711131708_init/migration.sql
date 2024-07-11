/*
  Warnings:

  - You are about to drop the column `add_customer` on the `customer_point` table. All the data in the column will be lost.
  - Added the required column `address_customer` to the `customer_point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_point" DROP COLUMN "add_customer",
ADD COLUMN     "address_customer" TEXT NOT NULL;
