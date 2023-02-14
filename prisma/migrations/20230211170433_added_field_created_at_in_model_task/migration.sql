/*
  Warnings:

  - Added the required column `created_at` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_task" ("color", "description", "done", "id", "title") SELECT "color", "description", "done", "id", "title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
