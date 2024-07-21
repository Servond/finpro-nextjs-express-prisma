/*
  Warnings:

  - Added the required column `expires_at` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Referral` ADD COLUMN `expires_at` DATETIME(3) NOT NULL;
