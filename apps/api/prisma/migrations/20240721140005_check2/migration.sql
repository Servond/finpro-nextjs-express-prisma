/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `event` table. All the data in the column will be lost.
  - The primary key for the `promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discount_amount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `max_uses` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_date` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `points_earned` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referee_id` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `referral` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referral_code` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactionitem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referrer_id,referred_id]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[own_referral_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_seats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `available_seats` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `discount_category_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_value` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotion_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points_awarded` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referral_code` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referred_id` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_until` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_organizer_id_fkey`;

-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `Point_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referee_id_fkey`;

-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referrer_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactionitem` DROP FOREIGN KEY `TransactionItem_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactionitem` DROP FOREIGN KEY `TransactionItem_transaction_id_fkey`;

-- DropIndex
DROP INDEX `User_referral_code_key` ON `user`;

-- AlterTable
ALTER TABLE `event` DROP PRIMARY KEY,
    DROP COLUMN `category`,
    DROP COLUMN `date`,
    DROP COLUMN `description`,
    DROP COLUMN `id`,
    DROP COLUMN `is_paid`,
    DROP COLUMN `location`,
    DROP COLUMN `name`,
    DROP COLUMN `time`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `event_description` VARCHAR(2000) NOT NULL,
    ADD COLUMN `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `event_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `location_id` INTEGER NOT NULL,
    ADD COLUMN `original_price` DOUBLE NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `total_seats` INTEGER NOT NULL,
    MODIFY `available_seats` INTEGER NOT NULL,
    ADD PRIMARY KEY (`event_id`);

-- AlterTable
ALTER TABLE `promotion` DROP PRIMARY KEY,
    DROP COLUMN `discount_amount`,
    DROP COLUMN `id`,
    DROP COLUMN `max_uses`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `discount_category_id` INTEGER NOT NULL,
    ADD COLUMN `discount_value` DOUBLE NOT NULL,
    ADD COLUMN `promotion_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`promotion_id`);

-- AlterTable
ALTER TABLE `referral` DROP COLUMN `expiration_date`,
    DROP COLUMN `points_earned`,
    DROP COLUMN `referee_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `points_awarded` INTEGER NOT NULL,
    ADD COLUMN `referral_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `referred_id` INTEGER NOT NULL,
    ADD COLUMN `valid_until` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `referral_code`,
    DROP COLUMN `role`,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `own_referral_code` VARCHAR(191) NULL,
    ADD COLUMN `point_balance` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `point`;

-- DropTable
DROP TABLE `review`;

-- DropTable
DROP TABLE `ticket`;

-- DropTable
DROP TABLE `transaction`;

-- DropTable
DROP TABLE `transactionitem`;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscountCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `DiscountCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event_Category` (
    `event_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`event_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket_Type` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Promotion_discount_category_id_idx` ON `Promotion`(`discount_category_id`);

-- CreateIndex
CREATE INDEX `Referral_referral_code_idx` ON `Referral`(`referral_code`);

-- CreateIndex
CREATE INDEX `Referral_referred_id_idx` ON `Referral`(`referred_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referrer_id_referred_id_key` ON `Referral`(`referrer_id`, `referred_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_own_referral_code_key` ON `User`(`own_referral_code`);

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- CreateIndex
CREATE INDEX `User_own_referral_code_idx` ON `User`(`own_referral_code`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrer_id_fkey` FOREIGN KEY (`referrer_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referred_id_fkey` FOREIGN KEY (`referred_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_discount_category_id_fkey` FOREIGN KEY (`discount_category_id`) REFERENCES `DiscountCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organizer_id_fkey` FOREIGN KEY (`organizer_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_Category` ADD CONSTRAINT `Event_Category_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event_Category` ADD CONSTRAINT `Event_Category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- RenameIndex
-- ALTER TABLE `promotion` RENAME INDEX `Promotion_event_id_fkey` TO `Promotion_event_id_idx`;

-- -- RenameIndex
-- ALTER TABLE `referral` RENAME INDEX `Referral_referrer_id_fkey` TO `Referral_referrer_id_idx`;
