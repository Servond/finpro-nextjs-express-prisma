/*
  Warnings:

  - You are about to drop the column `discountCoupon` on the `ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `discountCoupon`,
    ADD COLUMN `discountCouponCode` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `DiscountCoupon` (
    `code` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `discountAmount` DOUBLE NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_discountCouponCode_fkey` FOREIGN KEY (`discountCouponCode`) REFERENCES `DiscountCoupon`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscountCoupon` ADD CONSTRAINT `DiscountCoupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
