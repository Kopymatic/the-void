-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'uncategorized',
    "description" TEXT,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'kopymatic'
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");
