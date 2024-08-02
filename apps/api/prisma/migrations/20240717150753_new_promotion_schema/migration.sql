/*
  Warnings:

  - Added the required column `type` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` ADD COLUMN `type` VARCHAR(191) NOT NULL;
