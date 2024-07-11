/*
  Warnings:

  - The primary key for the `point_details` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "point_details" DROP CONSTRAINT "point_details_pkey",
ALTER COLUMN "id_point_detail" SET DATA TYPE TEXT,
ADD CONSTRAINT "point_details_pkey" PRIMARY KEY ("id_point_detail");
