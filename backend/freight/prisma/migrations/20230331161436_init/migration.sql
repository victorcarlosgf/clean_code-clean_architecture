-- CreateTable
CREATE TABLE `freight` (
    `id` VARCHAR(191) NOT NULL,
    `distance` INTEGER NOT NULL,
    `volume` INTEGER NOT NULL,
    `density` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zipcode` (
    `code` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `lat` INTEGER NOT NULL,
    `long` INTEGER NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
