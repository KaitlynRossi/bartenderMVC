-- CreateTable
CREATE TABLE "Drink" (
    "d_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "o_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "drink_id" INTEGER NOT NULL,
    "status" TEXT,
    CONSTRAINT "Order_drink_id_fkey" FOREIGN KEY ("drink_id") REFERENCES "Drink" ("d_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Drink_name_key" ON "Drink"("name");
