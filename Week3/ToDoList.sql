-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 ;
USE `todolist` ;

-- -----------------------------------------------------
-- Table `todos`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todos`.`todo_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`todo_list` (
  `list_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `list_name` VARCHAR(45) NOT NULL,
  `reminder` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`list_id`),
  INDEX `fk_todo_list_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_todo_list_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `todos`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todos`.`todo_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`todo_item` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `list_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `completed` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`),
  INDEX `fk_todo_item_todo_list1_idx` (`list_id` ASC) VISIBLE,
  CONSTRAINT `fk_todo_item_todo_list1`
    FOREIGN KEY (`list_id`)
    REFERENCES `todos`.`todo_list` (`list_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

LOCK TABLES `todolist`.`users` WRITE;
INSERT INTO `todolist`.`users` (user_name) VALUES ('hani');
UNLOCK TABLES;

LOCK TABLES `todolist`.`todo_list` WRITE;
INSERT INTO `todolist`.`todo_list` (user_id,list_name) VALUES ('1','shoping');
UNLOCK TABLES;

LOCK TABLES `todolist`.`todo_item` WRITE;
INSERT INTO `todolist`.`todo_item` (list_id,title,description) VALUES ('1','buy fruit','a colection of fruit');
UNLOCK TABLES;