-- DropIndex
DROP INDEX `financials_date_key` ON `financials`;

-- DropIndex
DROP INDEX `financials_symbolCode_key` ON `financials`;

-- AlterTable
ALTER TABLE `financials` MODIFY `symbolCode` VARCHAR(191) NULL;
