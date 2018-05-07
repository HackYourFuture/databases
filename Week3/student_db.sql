-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema student_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema student_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `student_db` DEFAULT CHARACTER SET utf8 ;
USE `student_db` ;

-- -----------------------------------------------------
-- Table `student_db`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`students` ;

CREATE TABLE IF NOT EXISTS `student_db`.`students` (
  `student_id` INT NOT NULL AUTO_INCREMENT,
  `student_fname` VARCHAR(45) NOT NULL,
  `student_lname` VARCHAR(45) NOT NULL,
  `student_dob` DATE NOT NULL,
  `student_email` VARCHAR(45) NULL,
  `student_tel` VARCHAR(45) NULL,
  `student_address` VARCHAR(45) NULL,
  PRIMARY KEY (`student_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `student_id_UNIQUE` ON `student_db`.`students` (`student_id` ASC);


-- -----------------------------------------------------
-- Table `student_db`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`courses` ;

CREATE TABLE IF NOT EXISTS `student_db`.`courses` (
  `course_code` INT NOT NULL,
  `course_name` VARCHAR(45) NOT NULL,
  `course_credithours` VARCHAR(45) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`course_code`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `course_code_UNIQUE` ON `student_db`.`courses` (`course_code` ASC);


-- -----------------------------------------------------
-- Table `student_db`.`professors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`professors` ;

CREATE TABLE IF NOT EXISTS `student_db`.`professors` (
  `professor_id` INT NOT NULL AUTO_INCREMENT,
  `professor_name` VARCHAR(45) NOT NULL,
  `professor_qualification` VARCHAR(45) NULL,
  PRIMARY KEY (`professor_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `professor_id_UNIQUE` ON `student_db`.`professors` (`professor_id` ASC);


-- -----------------------------------------------------
-- Table `student_db`.`semester`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`semester` ;

CREATE TABLE IF NOT EXISTS `student_db`.`semester` (
  `semester_season` VARCHAR(45) NOT NULL,
  `semester_year` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`semester_season`, `semester_year`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `student_db`.`student_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`student_course` ;

CREATE TABLE IF NOT EXISTS `student_db`.`student_course` (
  `s_id` INT NOT NULL,
  `c_id` INT NOT NULL,
  `semester_season` VARCHAR(45) NULL,
  `semester_year` VARCHAR(45) NULL,
  `grade` INT NULL,
  `students_student_id` INT NOT NULL,
  `courses_course_code` INT NOT NULL,
  `semester_semester_season` VARCHAR(45) NOT NULL,
  `semester_semester_year` VARCHAR(45) NOT NULL,
  `semester_semester_season1` VARCHAR(45) NOT NULL,
  `semester_semester_year1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`students_student_id`, `courses_course_code`, `semester_semester_season`, `semester_semester_year`, `semester_semester_season1`, `semester_semester_year1`),
  CONSTRAINT `fk_student_course_students1`
    FOREIGN KEY (`students_student_id`)
    REFERENCES `student_db`.`students` (`student_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_course_courses1`
    FOREIGN KEY (`courses_course_code`)
    REFERENCES `student_db`.`courses` (`course_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_course_semester1`
    FOREIGN KEY (`semester_semester_season` , `semester_semester_year`)
    REFERENCES `student_db`.`semester` (`semester_season` , `semester_year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_course_semester2`
    FOREIGN KEY (`semester_semester_season1` , `semester_semester_year1`)
    REFERENCES `student_db`.`semester` (`semester_season` , `semester_year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_student_course_courses1_idx` ON `student_db`.`student_course` (`courses_course_code` ASC);

CREATE INDEX `fk_student_course_semester1_idx` ON `student_db`.`student_course` (`semester_semester_season` ASC, `semester_semester_year` ASC);

CREATE INDEX `fk_student_course_semester2_idx` ON `student_db`.`student_course` (`semester_semester_season1` ASC, `semester_semester_year1` ASC);


-- -----------------------------------------------------
-- Table `student_db`.`semester_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_db`.`semester_course` ;

CREATE TABLE IF NOT EXISTS `student_db`.`semester_course` (
  `c_id` INT NULL,
  `prof_id` INT NULL,
  `semester_season` VARCHAR(45) NULL,
  `semester_year` VARCHAR(45) NULL,
  `semester_semester_season` VARCHAR(45) NOT NULL,
  `semester_semester_year` VARCHAR(45) NOT NULL,
  `semester_semester_season1` VARCHAR(45) NOT NULL,
  `semester_semester_year1` VARCHAR(45) NOT NULL,
  `courses_course_code` INT NOT NULL,
  `professors_professor_id` INT NOT NULL,
  PRIMARY KEY (`semester_semester_season`, `semester_semester_year`, `semester_semester_season1`, `semester_semester_year1`, `courses_course_code`, `professors_professor_id`),
  CONSTRAINT `fk_semester_course_semester1`
    FOREIGN KEY (`semester_semester_season` , `semester_semester_year`)
    REFERENCES `student_db`.`semester` (`semester_season` , `semester_year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_semester_course_semester2`
    FOREIGN KEY (`semester_semester_season1` , `semester_semester_year1`)
    REFERENCES `student_db`.`semester` (`semester_season` , `semester_year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_semester_course_courses1`
    FOREIGN KEY (`courses_course_code`)
    REFERENCES `student_db`.`courses` (`course_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_semester_course_professors1`
    FOREIGN KEY (`professors_professor_id`)
    REFERENCES `student_db`.`professors` (`professor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_semester_course_semester2_idx` ON `student_db`.`semester_course` (`semester_semester_season1` ASC, `semester_semester_year1` ASC);

CREATE INDEX `fk_semester_course_courses1_idx` ON `student_db`.`semester_course` (`courses_course_code` ASC);

CREATE INDEX `fk_semester_course_professors1_idx` ON `student_db`.`semester_course` (`professors_professor_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
