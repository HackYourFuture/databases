-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema my_compamy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_compamy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_compamy` DEFAULT CHARACTER SET utf8 ;
USE `my_compamy` ;

-- -----------------------------------------------------
-- Table `my_compamy`.`Department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Department` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_compamy`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Employee` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `birthdate` VARCHAR(45) NOT NULL,
  `Department_id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Department_id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `fk_Employee_Department1_idx` (`Department_id` ASC),
  CONSTRAINT `fk_Employee_Department1`
    FOREIGN KEY (`Department_id`)
    REFERENCES `my_compamy`.`Department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_compamy`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Project` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_compamy`.`Dependent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Dependent` (
  `number` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `relationship` VARCHAR(45) NULL,
  `birth_date` VARCHAR(45) NULL,
  `Employee_Id` INT NOT NULL,
  PRIMARY KEY (`number`, `Employee_Id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC),
  INDEX `fk_Dependent_Employee_idx` (`Employee_Id` ASC),
  CONSTRAINT `fk_Dependent_Employee`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `my_compamy`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_compamy`.`Department_has_Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Department_has_Project` (
  `Department_id` INT NOT NULL,
  `Project_id` INT NOT NULL,
  PRIMARY KEY (`Department_id`, `Project_id`),
  INDEX `fk_Department_has_Project_Project1_idx` (`Project_id` ASC),
  INDEX `fk_Department_has_Project_Department1_idx` (`Department_id` ASC),
  CONSTRAINT `fk_Department_has_Project_Department1`
    FOREIGN KEY (`Department_id`)
    REFERENCES `my_compamy`.`Department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Department_has_Project_Project1`
    FOREIGN KEY (`Project_id`)
    REFERENCES `my_compamy`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_compamy`.`Employee_has_Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_compamy`.`Employee_has_Project` (
  `Employee_Id` INT NOT NULL,
  `Project_id` INT NOT NULL,
  `hours` VARCHAR(45) NULL,
  PRIMARY KEY (`Employee_Id`, `Project_id`),
  INDEX `fk_Employee_has_Project_Project1_idx` (`Project_id` ASC),
  INDEX `fk_Employee_has_Project_Employee1_idx` (`Employee_Id` ASC),
  CONSTRAINT `fk_Employee_has_Project_Employee1`
    FOREIGN KEY (`Employee_Id`)
    REFERENCES `my_compamy`.`Employee` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_has_Project_Project1`
    FOREIGN KEY (`Project_id`)
    REFERENCES `my_compamy`.`Project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
