/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `discountCode` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `maxUses` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `usedCount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewText` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `registration` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referral_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available_seats` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_amount` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_uses` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_organizerId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `Registration_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `Registration_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropIndex
DROP INDEX `Promotion_discountCode_key` ON `promotion`;

-- DropIndex
DROP INDEX `User_referralCode_key` ON `user`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `availableSeats`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `organizerId`,
    DROP COLUMN `price`,
    DROP COLUMN `ticketType`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `available_seats` INTEGER NOT NULL,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_paid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `organizer_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `createdAt`,
    DROP COLUMN `discountAmount`,
    DROP COLUMN `discountCode`,
    DROP COLUMN `endDate`,
    DROP COLUMN `eventId`,
    DROP COLUMN `maxUses`,
    DROP COLUMN `startDate`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `usedCount`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `discount_amount` INTEGER NOT NULL,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `event_id` INTEGER NOT NULL,
    ADD COLUMN `max_uses` INTEGER NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `createdAt`,
    DROP COLUMN `eventId`,
    DROP COLUMN `reviewText`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `event_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `rating` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `points`,
    DROP COLUMN `referralCode`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `referral_code` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('customer', 'organizer', 'admin') NOT NULL;

-- DropTable
DROP TABLE `registration`;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `available_quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL DEFAULT 0,
    `final_price` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrer_id` INTEGER NOT NULL,
    `referee_id` INTEGER NOT NULL,
    `points_earned` INTEGER NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `expiration_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referral_code_key` ON `User`(`referral_code`);

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organizer_id_fkey` FOREIGN KEY (`organizer_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionItem` ADD CONSTRAINT `TransactionItem_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionItem` ADD CONSTRAINT `TransactionItem_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrer_id_fkey` FOREIGN KEY (`referrer_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referee_id_fkey` FOREIGN KEY (`referee_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
