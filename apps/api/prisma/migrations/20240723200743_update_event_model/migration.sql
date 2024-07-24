/*
  Warnings:

  - You are about to drop the column `category_id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_category` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_category_id_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `category_id`,
    ADD COLUMN `event_category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `EventCategory`;
