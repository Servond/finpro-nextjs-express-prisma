/*
  Warnings:

  - Added the required column `city_name` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `location` ADD COLUMN `city_name` VARCHAR(191) NOT NULL;
