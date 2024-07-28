/*
  Warnings:

  - You are about to drop the column `event_date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_limit` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_price` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `event_date`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `ticket_limit` INTEGER NOT NULL,
    ADD COLUMN `ticket_price` INTEGER NOT NULL;
