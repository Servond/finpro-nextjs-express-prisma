-- CreateTable
CREATE TABLE `Points` (
    `pointsId` INTEGER NOT NULL AUTO_INCREMENT,
    `pointsBalance` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`pointsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
