-- CreateTable
CREATE TABLE "Book" (
    "id" BIGINT NOT NULL,
    "title" TEXT,
    "author" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");
