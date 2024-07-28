-- CreateTable
CREATE TABLE `PointsExpiry` (
    `pointsExpiryId` INTEGER NOT NULL AUTO_INCREMENT,
    `expiryDate` DATETIME(3) NOT NULL,
    `pointsId` INTEGER NOT NULL,

    PRIMARY KEY (`pointsExpiryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PointsExpiry` ADD CONSTRAINT `PointsExpiry_pointsId_fkey` FOREIGN KEY (`pointsId`) REFERENCES `Points`(`pointsId`) ON DELETE RESTRICT ON UPDATE CASCADE;
