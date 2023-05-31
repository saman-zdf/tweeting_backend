-- DropIndex
DROP INDEX `users_password_key` ON `users`;

-- AlterTable
ALTER TABLE `tweets` ADD COLUMN `gifUrl` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
