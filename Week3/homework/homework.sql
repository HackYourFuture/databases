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
-- Table `mydb`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`company` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`genres` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`countries` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`company_has_games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`company_has_games` (
  `company_id` INT NOT NULL,
  `games_id` INT NOT NULL,
  PRIMARY KEY (`company_id`, `games_id`),
  INDEX `fk_company_has_games_games1_idx` (`games_id` ASC),
  INDEX `fk_company_has_games_company_idx` (`company_id` ASC),
  CONSTRAINT `fk_company_has_games_company`
    FOREIGN KEY (`company_id`)
    REFERENCES `mydb`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_has_games_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `mydb`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`games_has_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games_has_genres` (
  `games_id` INT NOT NULL,
  `genres_id` INT NOT NULL,
  PRIMARY KEY (`games_id`, `genres_id`),
  INDEX `fk_games_has_genres_genres1_idx` (`genres_id` ASC),
  INDEX `fk_games_has_genres_games1_idx` (`games_id` ASC),
  CONSTRAINT `fk_games_has_genres_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `mydb`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_has_genres_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `mydb`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`games_has_countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games_has_countries` (
  `games_id` INT NOT NULL,
  `countries_id` INT NOT NULL,
  PRIMARY KEY (`games_id`, `countries_id`),
  INDEX `fk_games_has_countries_countries1_idx` (`countries_id` ASC),
  INDEX `fk_games_has_countries_games1_idx` (`games_id` ASC),
  CONSTRAINT `fk_games_has_countries_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `mydb`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_has_countries_countries1`
    FOREIGN KEY (`countries_id`)
    REFERENCES `mydb`.`countries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
