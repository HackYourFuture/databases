-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema todo_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todo_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todo_db` DEFAULT CHARACTER SET utf8 ;
USE `todo_db` ;

-- -----------------------------------------------------
-- Table `todo_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_db`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `number` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_db`.`todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_db`.`todo` (
  `todo id` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `is done` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`todo id`, `user_id`),
  INDEX `fk_todo_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_todo_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `todo_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_db`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_db`.`tags` (
  `tags id` INT NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tags id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo_db`.`tags_has_todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo_db`.`tags_has_todo` (
  `tags_tags id` INT NOT NULL,
  `todo_todo id` INT NOT NULL,
  `todo_user_id` INT NOT NULL,
  PRIMARY KEY (`tags_tags id`, `todo_todo id`, `todo_user_id`),
  INDEX `fk_tags_has_todo_todo1_idx` (`todo_todo id` ASC, `todo_user_id` ASC),
  INDEX `fk_tags_has_todo_tags1_idx` (`tags_tags id` ASC),
  CONSTRAINT `fk_tags_has_todo_tags1`
    FOREIGN KEY (`tags_tags id`)
    REFERENCES `todo_db`.`tags` (`tags id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tags_has_todo_todo1`
    FOREIGN KEY (`todo_todo id` , `todo_user_id`)
    REFERENCES `todo_db`.`todo` (`todo id` , `user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
