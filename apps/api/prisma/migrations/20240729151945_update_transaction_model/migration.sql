/*
  Warnings:

  - You are about to drop the column `payment_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_name` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_ticket_id_fkey";

-- DropIndex
DROP INDEX "Transaction_payment_id_idx";

-- DropIndex
DROP INDEX "Transaction_ticket_id_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payment_id",
DROP COLUMN "ticket_id",
ADD COLUMN     "event_id" INTEGER NOT NULL,
ADD COLUMN     "event_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Payment";

-- CreateIndex
CREATE INDEX "Transaction_event_id_idx" ON "Transaction"("event_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
