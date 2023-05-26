-- CreateTable
CREATE TABLE "Aas" (
    "idShort" TEXT NOT NULL,
    "catalogue" TEXT,
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aas_id_key" ON "Aas"("id");
