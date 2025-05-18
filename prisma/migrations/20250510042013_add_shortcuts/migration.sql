-- CreateTable
CREATE TABLE "Shortcut" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shortcut" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Shortcut_shortcut_key" ON "Shortcut"("shortcut");

-- CreateIndex
CREATE UNIQUE INDEX "Shortcut_redirectUrl_key" ON "Shortcut"("redirectUrl");
