/*
  Warnings:

  - You are about to alter the column `type` on the `promotion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `promotion` MODIFY `type` ENUM('voucher', 'discount') NOT NULL;
