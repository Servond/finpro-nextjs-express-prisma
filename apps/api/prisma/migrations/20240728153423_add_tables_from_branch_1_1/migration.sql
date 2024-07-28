-- -- CreateTable
-- CREATE TABLE `Event` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `organizerName` VARCHAR(191) NOT NULL,
--     `eventTitle` VARCHAR(191) NOT NULL,
--     `description` VARCHAR(10000) NOT NULL,
--     `imagePath` VARCHAR(191) NULL,
--     `date` DATETIME(3) NOT NULL,
--     `startTime` VARCHAR(191) NOT NULL,
--     `endTime` VARCHAR(191) NOT NULL,
--     `location` VARCHAR(191) NOT NULL,
--     `address` VARCHAR(191) NOT NULL,
--     `venueName` VARCHAR(191) NOT NULL,
--     `price` DOUBLE NULL,
--     `capacity` INTEGER NOT NULL,
--     `categoryId` INTEGER NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Category` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Ticket` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `type` VARCHAR(191) NOT NULL,
--     `price` DOUBLE NOT NULL,
--     `description` VARCHAR(191) NULL,
--     `eventId` INTEGER NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Promotion` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `eventId` INTEGER NOT NULL,
--     `code` VARCHAR(191) NOT NULL,
--     `type` VARCHAR(191) NOT NULL,
--     `amount` DOUBLE NOT NULL,
--     `maxUses` INTEGER NOT NULL,
--     `startDate` DATETIME(3) NOT NULL,
--     `endDate` DATETIME(3) NOT NULL,
--     `description` VARCHAR(191) NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Review` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `eventId` INTEGER NOT NULL,
--     `name` VARCHAR(191) NULL,
--     `rating` INTEGER NOT NULL,
--     `comment` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Order` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `eventId` INTEGER NOT NULL,
--     `ticketId` INTEGER NOT NULL,
--     `quantity` INTEGER NOT NULL,
--     `totalPrice` DOUBLE NOT NULL,
--     `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `Event` ADD CONSTRAINT `Event_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Review` ADD CONSTRAINT `Review_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Order` ADD CONSTRAINT `Order_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Order` ADD CONSTRAINT `Order_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
