/*
  Warnings:

  - Added the required column `commentId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `replyId` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `likes` ADD COLUMN `commentId` INTEGER NOT NULL,
    ADD COLUMN `replyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `replies` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `replies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
