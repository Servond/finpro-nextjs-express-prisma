/*
  Warnings:

  - Added the required column `expiryDate` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Points` ADD COLUMN `expiryDate` DATETIME DEFAULT CURRENT_TIMESTAMP;
