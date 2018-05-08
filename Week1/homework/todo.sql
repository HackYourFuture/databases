-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema todos
-- -----------------------------------------------------
-- my database created from ERD

-- -----------------------------------------------------
-- Schema todos
--
-- my database created from ERD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todos` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `todos` ;

-- -----------------------------------------------------
-- Table `todos`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todos`.`user` (
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(25) NOT NULL,
  `user_address` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todos`.`TODO_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todos`.`TODO_item` (
  `TODO_item_id` INT NOT NULL,
  `TODO_text` VARCHAR(45) NOT NULL,
  `TODO_description` VARCHAR(30) NULL,
  `is_done` TINYINT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`TODO_item_id`, `user_user_id`),
  UNIQUE INDEX `TODO_item_id_UNIQUE` (`TODO_item_id` ASC),
  INDEX `fk_TODO_item_user_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_TODO_item_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `todos`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todos`.`TODO_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todos`.`TODO_tag` (
  `TODO_tag_id` INT NOT NULL,
  `tag_text` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`TODO_tag_id`),
  UNIQUE INDEX `TODO_tag_id_UNIQUE` (`TODO_tag_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todos`.`TODO_item_has_TODO_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todos`.`TODO_item_has_TODO_tag` (
  `TODO_item_TODO_item_id` INT NOT NULL,
  `TODO_item_user_user_id` INT NOT NULL,
  `TODO_tag_TODO_tag_id` INT NOT NULL,
  PRIMARY KEY (`TODO_item_TODO_item_id`, `TODO_item_user_user_id`, `TODO_tag_TODO_tag_id`),
  INDEX `fk_TODO_item_has_TODO_tag_TODO_tag1_idx` (`TODO_tag_TODO_tag_id` ASC),
  INDEX `fk_TODO_item_has_TODO_tag_TODO_item1_idx` (`TODO_item_TODO_item_id` ASC, `TODO_item_user_user_id` ASC),
  CONSTRAINT `fk_TODO_item_has_TODO_tag_TODO_item1`
    FOREIGN KEY (`TODO_item_TODO_item_id` , `TODO_item_user_user_id`)
    REFERENCES `todos`.`TODO_item` (`TODO_item_id` , `user_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TODO_item_has_TODO_tag_TODO_tag1`
    FOREIGN KEY (`TODO_tag_TODO_tag_id`)
    REFERENCES `todos`.`TODO_tag` (`TODO_tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
