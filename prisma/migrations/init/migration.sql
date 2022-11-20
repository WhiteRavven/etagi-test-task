-- CreateTable
CREATE TABLE "flats" (
    "id" INTEGER NOT NULL,
    "floor" SMALLINT NOT NULL,
    "pos_on_floor" SMALLINT NOT NULL,
    "price" REAL NOT NULL,
    "rooms" SMALLINT NOT NULL,
    "area_total" REAL NOT NULL,
    "area_kitchen" REAL NOT NULL,
    "area_live" REAL NOT NULL,
    "layout_image" TEXT,

    CONSTRAINT "flats_pkey" PRIMARY KEY ("id")
);

