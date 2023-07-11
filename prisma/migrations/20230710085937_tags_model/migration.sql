/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `financials` (
    `symbolCode` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NULL,
    `change_stock_price_rate` INTEGER NULL,
    `change_financial_rate` INTEGER NULL,

    UNIQUE INDEX `financials_symbolCode_key`(`symbolCode`),
    UNIQUE INDEX `financials_date_key`(`date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
