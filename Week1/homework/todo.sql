SET
  @OLD_UNIQUE_CHECKS = @ @UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;
SET
  @OLD_FOREIGN_KEY_CHECKS = @ @FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;
SET
  @OLD_SQL_MODE = @ @SQL_MODE,
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
  CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;USE `mydb`;
-- -----------------------------------------------------
-- Table `mydb`.`tag`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `mydb`.`tag` (
    `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX (`name` ASC) VISIBLE
  );
-- -----------------------------------------------------
-- Table `mydb`.`todo`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `mydb`.`todo` (
    `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `done` TINYINT NOT NULL,
    `timestamp` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
);
-- -----------------------------------------------------
-- Table `mydb`.`tag_todos`
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `mydb`.`tag_todos` (
    `todo` INT NOT NULL,
    `tag` INT NOT NULL,
    PRIMARY KEY (`todo`, `tag`),
    INDEX `idx_tag_todos` (`tag` ASC) VISIBLE,
    CONSTRAINT `fk_tag_todos__tag` FOREIGN KEY (`tag`) REFERENCES `mydb`.`tag` (`id`),
    CONSTRAINT `fk_tag_todos__todo` FOREIGN KEY (`todo`) REFERENCES `mydb`.`todo` (`id`)
  );
SET
  SQL_MODE = @OLD_SQL_MODE;
SET
  FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET
  UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;