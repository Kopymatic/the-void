-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'uncategorized',
    "description" TEXT,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'kopymatic',
    "authorId" TEXT NOT NULL DEFAULT '326489320980611075',
    "unlisted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("author", "body", "category", "createdAt", "description", "id", "updatedAt", "url") SELECT "author", "body", "category", "createdAt", "description", "id", "updatedAt", "url" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
