/*
  Warnings:

  - You are about to drop the column `follower_user_id` on the `follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[following_user_id]` on the table `follows` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_follower_user_id_fkey`;

-- DropIndex
DROP INDEX `follows_follower_user_id_following_user_id_key` ON `follows`;

-- DropIndex
DROP INDEX `follows_id_follower_user_id_following_user_id_idx` ON `follows`;

-- AlterTable
ALTER TABLE `follows` DROP COLUMN `follower_user_id`;

-- CreateIndex
CREATE INDEX `follows_id_following_user_id_idx` ON `follows`(`id`, `following_user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `follows_following_user_id_key` ON `follows`(`following_user_id`);
