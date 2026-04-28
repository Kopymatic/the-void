-- AlterTable
ALTER TABLE "Shortcut" ADD COLUMN     "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[];
