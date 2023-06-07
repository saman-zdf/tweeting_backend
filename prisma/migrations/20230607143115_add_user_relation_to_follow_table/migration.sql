/*
  Warnings:

  - Added the required column `user_id` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_follower_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_following_user_id_fkey`;

-- AlterTable
ALTER TABLE `follows` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_follower_user_id_fkey` FOREIGN KEY (`follower_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_following_user_id_fkey` FOREIGN KEY (`following_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
