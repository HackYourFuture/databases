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
-- Table `mydb`.`Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Employees` (
  `idEmployees` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NULL,
  PRIMARY KEY (`idEmployees`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer` (
  `idcustomer` INT NOT NULL AUTO_INCREMENT,
  `first name` VARCHAR(45) NOT NULL,
  `last name` VARCHAR(45) NOT NULL,
  `birthday` INT NOT NULL,
  `customer-num` INT NOT NULL,
  `Employees_idEmployees` INT NOT NULL,
  PRIMARY KEY (`idcustomer`, `Employees_idEmployees`),
  INDEX `fk_customer_Employees1_idx` (`Employees_idEmployees` ASC),
  CONSTRAINT `fk_customer_Employees1`
    FOREIGN KEY (`Employees_idEmployees`)
    REFERENCES `mydb`.`Employees` (`idEmployees`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`rooms` (
  `idrooms` INT NOT NULL AUTO_INCREMENT,
  `room-number` INT NOT NULL,
  `price` INT NULL,
  `date_of_rent` DATE NOT NULL,
  `end_day` DATE NOT NULL,
  `empty_or_not` TINYINT NULL,
  `Employees_idEmployees` INT NOT NULL,
  `room_type` VARCHAR(45) NULL,
  `roomscol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idrooms`, `Employees_idEmployees`),
  INDEX `fk_rooms_Employees1_idx` (`Employees_idEmployees` ASC),
  CONSTRAINT `fk_rooms_Employees1`
    FOREIGN KEY (`Employees_idEmployees`)
    REFERENCES `mydb`.`Employees` (`idEmployees`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customer_has_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customer_has_rooms` (
  `customer_idcustomer` INT NOT NULL,
  `rooms_idrooms` INT NOT NULL,
  PRIMARY KEY (`customer_idcustomer`, `rooms_idrooms`),
  INDEX `fk_customer_has_rooms_rooms1_idx` (`rooms_idrooms` ASC),
  INDEX `fk_customer_has_rooms_customer1_idx` (`customer_idcustomer` ASC),
  CONSTRAINT `fk_customer_has_rooms_customer1`
    FOREIGN KEY (`customer_idcustomer`)
    REFERENCES `mydb`.`customer` (`idcustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_has_rooms_rooms1`
    FOREIGN KEY (`rooms_idrooms`)
    REFERENCES `mydb`.`rooms` (`idrooms`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
