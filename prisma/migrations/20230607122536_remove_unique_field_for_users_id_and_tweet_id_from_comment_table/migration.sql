-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_tweet_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropIndex
DROP INDEX `comments_user_id_tweet_id_key` ON `comments`;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
