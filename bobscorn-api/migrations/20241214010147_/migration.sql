-- CreateTable
CREATE TABLE "CornPurchases" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CornPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CornPurchases_client_id_key" ON "CornPurchases"("client_id");
