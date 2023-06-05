-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_tweet_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_fkey`;

-- AlterTable
ALTER TABLE `likes` ADD COLUMN `deletedAt` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
