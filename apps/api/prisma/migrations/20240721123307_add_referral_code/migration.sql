/*
  Warnings:

  - The primary key for the `Promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `promotion_id` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Referral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `referral_id` on the `Referral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `referral_code` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Promotion` DROP PRIMARY KEY,
    MODIFY `promotion_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`promotion_id`);

-- AlterTable
ALTER TABLE `Referral` DROP PRIMARY KEY,
    ADD COLUMN `referral_code` VARCHAR(191) NOT NULL,
    MODIFY `referral_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`referral_id`);
