-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_key" ON "Images"("id");
