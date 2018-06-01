-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`employees` (
  `empEmail` VARCHAR(50) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `phoneNO` INT NOT NULL,
  PRIMARY KEY (`empEmail`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer` (
  `cusEmail` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `registerDate` DATE NOT NULL,
  `employees_empEmail` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`cusEmail`, `employees_empEmail`),
  INDEX `fk_customer_employees1_idx` (`employees_empEmail` ASC),
  CONSTRAINT `fk_customer_employees1`
    FOREIGN KEY (`employees_empEmail`)
    REFERENCES `mydb`.`employees` (`empEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`address` (
  `addressId` INT NOT NULL AUTO_INCREMENT,
  `StreetName` VARCHAR(50) NOT NULL,
  `homeNumber` VARCHAR(45) NOT NULL,
  `zipCode` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL DEFAULT 'NL',
  `TelephoneNo` INT NULL,
  `mobileNo` INT NULL,
  PRIMARY KEY (`addressId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`stuff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`stuff` (
  `stuffId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sn` VARCHAR(50) NULL,
  `item` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `quntitiy` INT(50) NOT NULL,
  `customer_cusEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`stuffId`, `customer_cusEmail`),
  INDEX `fk_stuff_customer1_idx` (`customer_cusEmail` ASC),
  CONSTRAINT `fk_stuff_customer1`
    FOREIGN KEY (`customer_cusEmail`)
    REFERENCES `mydb`.`customer` (`cusEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`traking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`traking` (
  `trkId` INT NOT NULL AUTO_INCREMENT,
  `dateOfSentItFromCustomer` DATE NOT NULL,
  `onTheWayToOffice` TINYINT NULL,
  `dateOfReceiving` DATE NULL,
  `processOfMaintaining` TINYINT NULL,
  `dateOfsentItToCustomer` DATE NULL,
  `onTheWayToCustomer` TINYINT NULL,
  `stuff_stuffId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`trkId`, `stuff_stuffId`),
  UNIQUE INDEX `trkId_UNIQUE` (`trkId` ASC),
  INDEX `fk_traking_stuff1_idx` (`stuff_stuffId` ASC),
  CONSTRAINT `fk_traking_stuff1`
    FOREIGN KEY (`stuff_stuffId`)
    REFERENCES `mydb`.`stuff` (`stuffId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`stuffinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`stuffinfo` (
  `description` TEXT(150) NULL,
  `photo` MEDIUMBLOB NULL,
  `stuff_stuffId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`stuff_stuffId`),
  CONSTRAINT `fk_stuffinfo_stuff1`
    FOREIGN KEY (`stuff_stuffId`)
    REFERENCES `mydb`.`stuff` (`stuffId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`address_has_customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`address_has_customer` (
  `address_addressId` INT NOT NULL,
  `customer_cusEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`address_addressId`, `customer_cusEmail`),
  INDEX `fk_address_has_customer_customer1_idx` (`customer_cusEmail` ASC),
  INDEX `fk_address_has_customer_address1_idx` (`address_addressId` ASC),
  CONSTRAINT `fk_address_has_customer_address1`
    FOREIGN KEY (`address_addressId`)
    REFERENCES `mydb`.`address` (`addressId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_address_has_customer_customer1`
    FOREIGN KEY (`customer_cusEmail`)
    REFERENCES `mydb`.`customer` (`cusEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
