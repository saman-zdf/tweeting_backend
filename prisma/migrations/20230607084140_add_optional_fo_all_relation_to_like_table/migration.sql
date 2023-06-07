-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_replyId_fkey`;

-- AlterTable
ALTER TABLE `likes` MODIFY `tweet_id` INTEGER NULL,
    MODIFY `commentId` INTEGER NULL,
    MODIFY `replyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `replies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
