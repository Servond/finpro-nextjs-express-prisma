/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipping_addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_fkey`;

-- DropForeignKey
ALTER TABLE `shipping_addresses` DROP FOREIGN KEY `shipping_addresses_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `cellphone` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `company` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NULL,
    ADD COLUMN `profileImage` LONGBLOB NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `profiles`;

-- DropTable
DROP TABLE `shipping_addresses`;
