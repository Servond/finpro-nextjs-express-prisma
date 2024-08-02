/*
  Warnings:

  - You are about to drop the column `discount` on the `promotion` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxUses` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `discount`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `maxUses` INTEGER NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;
