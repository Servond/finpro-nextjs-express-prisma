/*
  Warnings:

  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `phone_number`,
    DROP COLUMN `username`;
