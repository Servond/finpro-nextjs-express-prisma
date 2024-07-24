/*
  Warnings:

  - Added the required column `total_seats` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `total_seats` INTEGER NOT NULL;
