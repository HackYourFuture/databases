-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hospital` DEFAULT CHARACTER SET utf8 ;
USE `hospital` ;

-- -----------------------------------------------------
-- Table `hospital`.`doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`doctor` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`department` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `doctor_id` INT NOT NULL,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  PRIMARY KEY (`id`, `doctor_id`),
  INDEX `fk_department_doctor1_idx` (`doctor_id` ASC),
  CONSTRAINT `fk_department_doctor1`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `hospital`.`doctor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`room` (
  `id` INT NOT NULL,
  `number of patient` INT NULL,
  `department_id` INT NOT NULL,
  `department_doctor_id` INT NOT NULL,
  PRIMARY KEY (`id`, `department_id`, `department_doctor_id`),
  INDEX `fk_room_department1_idx` (`department_id` ASC, `department_doctor_id` ASC),
  CONSTRAINT `fk_room_department1`
    FOREIGN KEY (`department_id` , `department_doctor_id`)
    REFERENCES `hospital`.`department` (`id` , `doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`patient` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `phoneNumber` INT NULL,
  `address` VARCHAR(45) NOT NULL,
  `room_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  `department_doctor_id` INT NOT NULL,
  PRIMARY KEY (`id`, `room_id`, `department_id`, `department_doctor_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_patient_room1_idx` (`room_id` ASC),
  INDEX `fk_patient_department1_idx` (`department_id` ASC, `department_doctor_id` ASC),
  CONSTRAINT `fk_patient_room1`
    FOREIGN KEY (`room_id`)
    REFERENCES `hospital`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_department1`
    FOREIGN KEY (`department_id` , `department_doctor_id`)
    REFERENCES `hospital`.`department` (`id` , `doctor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`medicine` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `expire date` DATE NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`doctor_has_patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`doctor_has_patient` (
  `doctor_id` INT NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`doctor_id`, `patient_id`),
  INDEX `fk_doctor_has_patient_patient1_idx` (`patient_id` ASC),
  INDEX `fk_doctor_has_patient_doctor_idx` (`doctor_id` ASC),
  CONSTRAINT `fk_doctor_has_patient_doctor`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `hospital`.`doctor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doctor_has_patient_patient1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `hospital`.`patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`patient_has_medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`patient_has_medicine` (
  `patient_id` INT NOT NULL,
  `patient_room_id` INT NOT NULL,
  `medicine_id` INT NOT NULL,
  PRIMARY KEY (`patient_id`, `patient_room_id`, `medicine_id`),
  INDEX `fk_patient_has_medicine_medicine1_idx` (`medicine_id` ASC),
  INDEX `fk_patient_has_medicine_patient1_idx` (`patient_id` ASC, `patient_room_id` ASC),
  CONSTRAINT `fk_patient_has_medicine_patient1`
    FOREIGN KEY (`patient_id` , `patient_room_id`)
    REFERENCES `hospital`.`patient` (`id` , `room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_has_medicine_medicine1`
    FOREIGN KEY (`medicine_id`)
    REFERENCES `hospital`.`medicine` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
