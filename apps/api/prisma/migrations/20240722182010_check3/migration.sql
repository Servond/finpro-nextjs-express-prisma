-- CreateIndex
CREATE INDEX `Referral_referrer_id_idx` ON `Referral`(`referrer_id`);

-- RenameIndex
ALTER TABLE `event` RENAME INDEX `Event_location_id_fkey` TO `Event_location_id_idx`;

-- RenameIndex
ALTER TABLE `event` RENAME INDEX `Event_organizer_id_fkey` TO `Event_organizer_id_idx`;

-- RenameIndex
ALTER TABLE `promotion` RENAME INDEX `Promotion_event_id_fkey` TO `Promotion_event_id_idx`;
