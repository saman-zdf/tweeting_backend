-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_tweet_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
