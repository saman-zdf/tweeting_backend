-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_tweet_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tweets` DROP FOREIGN KEY `tweets_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `tweets` ADD CONSTRAINT `tweets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_tweet_id_fkey` FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `replies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
