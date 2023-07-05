-- AlterTable
ALTER TABLE `user` MODIFY `img` VARCHAR(255) NULL DEFAULT '/default-img.png',
    MODIFY `designation` VARCHAR(255) NULL DEFAULT 'N/A',
    MODIFY `bio` VARCHAR(255) NULL DEFAULT 'No bio available.';
