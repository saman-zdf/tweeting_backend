/*
  Warnings:

  - Added the required column `update_at` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `follows` ADD COLUMN `unFollow` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tweets` ADD COLUMN `update_at` DATETIME(3) NOT NULL;
