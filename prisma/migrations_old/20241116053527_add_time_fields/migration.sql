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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("author", "body", "category", "description", "id", "url") SELECT "author", "body", "category", "description", "id", "url" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
