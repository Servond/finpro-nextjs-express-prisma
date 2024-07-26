/*
  Warnings:

  - You are about to drop the column `code` on the `samples` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `samples` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referralCode]` on the table `samples` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `samples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `samples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `samples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `samples` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `samples_code_key` ON `samples`;

-- AlterTable
ALTER TABLE `samples` DROP COLUMN `code`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('CUSTOMER', 'PROMOTER') NOT NULL;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `promoterId` INTEGER NOT NULL,

    INDEX `Event_promoterId_fkey`(`promoterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `samples_email_key` ON `samples`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `samples_referralCode_key` ON `samples`(`referralCode`);
