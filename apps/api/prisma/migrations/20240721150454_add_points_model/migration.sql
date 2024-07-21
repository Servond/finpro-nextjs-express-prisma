/*
  Warnings:

  - You are about to drop the column `points_awarded` on the `Referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referral_code]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `points_awarded`;

-- CreateTable
CREATE TABLE `Points` (
    `points_id` INTEGER NOT NULL AUTO_INCREMENT,
    `referral_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    INDEX `Points_user_id_fkey`(`user_id`),
    INDEX `Points_referral_id_fkey`(`referral_id`),
    PRIMARY KEY (`points_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referral_code_key` ON `Referral`(`referral_code`);

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_referral_id_fkey` FOREIGN KEY (`referral_id`) REFERENCES `Referral`(`referral_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
