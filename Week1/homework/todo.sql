-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- MY Database 

-- -----------------------------------------------------
-- Schema mydb
--
-- MY Database 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `idUsers` INT NOT NULL,
  `First name` VARCHAR(45) NOT NULL,
  `last name` VARCHAR(45) NOT NULL,
  `Birthday` VARCHAR(45) NOT NULL,
  `E-mail adress` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Todo list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Todo list` (
  `idTodo list` INT NOT NULL,
  `descrebtoin` VARCHAR(45) NOT NULL,
  `done` TINYINT NULL,
  `Users_idUsers` INT NOT NULL,
  PRIMARY KEY (`idTodo list`, `Users_idUsers`),
  UNIQUE INDEX `idTodo list_UNIQUE` (`idTodo list` ASC),
  INDEX `fk_Todo list_Users1_idx` (`Users_idUsers` ASC),
  CONSTRAINT `fk_Todo list_Users1`
    FOREIGN KEY (`Users_idUsers`)
    REFERENCES `mydb`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tags` (
  `idTags` INT NOT NULL,
  `describtion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTags`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Todo list_has_Tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Todo list_has_Tags` (
  `Todo list_idTodo list` INT NOT NULL,
  `Tags_idTags` INT NOT NULL,
  PRIMARY KEY (`Todo list_idTodo list`, `Tags_idTags`),
  INDEX `fk_Todo list_has_Tags_Tags1_idx` (`Tags_idTags` ASC),
  INDEX `fk_Todo list_has_Tags_Todo list1_idx` (`Todo list_idTodo list` ASC),
  CONSTRAINT `fk_Todo list_has_Tags_Todo list1`
    FOREIGN KEY (`Todo list_idTodo list`)
    REFERENCES `mydb`.`Todo list` (`idTodo list`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Todo list_has_Tags_Tags1`
    FOREIGN KEY (`Tags_idTags`)
    REFERENCES `mydb`.`Tags` (`idTags`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
