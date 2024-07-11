-- CreateTable
CREATE TABLE "customer_point" (
    "id_customer" TEXT NOT NULL,
    "nm_customer" TEXT NOT NULL,
    "id_point" TEXT NOT NULL,
    "point_type" TEXT NOT NULL,
    "point_customer" INTEGER NOT NULL,
    "no_hp_customer" INTEGER NOT NULL,
    "add_customer" TEXT NOT NULL,

    CONSTRAINT "customer_point_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "point_details" (
    "id_point_detail" INTEGER NOT NULL,
    "id_customer" TEXT NOT NULL,
    "id_point" TEXT NOT NULL,
    "point_amount" INTEGER NOT NULL,

    CONSTRAINT "point_details_pkey" PRIMARY KEY ("id_point_detail")
);

-- AddForeignKey
ALTER TABLE "point_details" ADD CONSTRAINT "point_details_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customer_point"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;
