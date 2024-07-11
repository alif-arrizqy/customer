/*
  Warnings:

  - Changed the type of `no_hp_customer` on the `customer_point` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customer_point" DROP COLUMN "no_hp_customer",
ADD COLUMN     "no_hp_customer" BIGINT NOT NULL;
