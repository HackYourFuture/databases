-- Schema mydata
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydata` DEFAULT CHARACTER SET utf8 ;
USE `mydata` ;

-- -----------------------------------------------------
-- Table `mydata`.`classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`classes` (
  `calsses_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `max_no_students` INT(11) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`calsses_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`schools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`schools` (
  `name` VARCHAR(255) NOT NULL,
  `postcode` VARCHAR(10) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`schools_has_classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`schools_has_classes` (
  `schools_name` VARCHAR(255) NOT NULL,
  `classes_calsses_id` INT(11) NOT NULL,
  PRIMARY KEY (`schools_name`, `classes_calsses_id`),
  INDEX `fk_schools_has_classes_classes1_idx` (`classes_calsses_id` ASC),
  INDEX `fk_schools_has_classes_schools1_idx` (`schools_name` ASC),
  CONSTRAINT `fk_schools_has_classes_classes1`
    FOREIGN KEY (`classes_calsses_id`)
    REFERENCES `mydata`.`classes` (`calsses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schools_has_classes_schools1`
    FOREIGN KEY (`schools_name`)
    REFERENCES `mydata`.`schools` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`students` (
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `gender` INT(11) NULL DEFAULT NULL,
  `s_claasId` INT NOT NULL AUTO_INCREMENT,
  INDEX `claasId_s_idx` (`s_claasId` ASC),
  CONSTRAINT `claasId_stud`
    FOREIGN KEY (`s_claasId`)
    REFERENCES `mydata`.`classes` (`calsses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`teachers` (
  `teacher_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `gender` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`teachers_has_classes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`teachers_has_classes` (
  `teachers_teacher_id` INT(11) NOT NULL,
  `classes_calsses_id` INT(11) NOT NULL,
  PRIMARY KEY (`teachers_teacher_id`, `classes_calsses_id`),
  INDEX `fk_teachers_has_classes_classes1_idx` (`classes_calsses_id` ASC),
  INDEX `fk_teachers_has_classes_teachers1_idx` (`teachers_teacher_id` ASC),
  CONSTRAINT `fk_teachers_has_classes_classes1`
    FOREIGN KEY (`classes_calsses_id`)
    REFERENCES `mydata`.`classes` (`calsses_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teachers_has_classes_teachers1`
    FOREIGN KEY (`teachers_teacher_id`)
    REFERENCES `mydata`.`teachers` (`teacher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydata`.`teachers_has_schools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydata`.`teachers_has_schools` (
  `teachers_teacher_id` INT(11) NOT NULL,
  `schools_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`teachers_teacher_id`, `schools_name`),
  INDEX `fk_teachers_has_schools_schools1_idx` (`schools_name` ASC),
  INDEX `fk_teachers_has_schools_teachers1_idx` (`teachers_teacher_id` ASC),
  CONSTRAINT `fk_teachers_has_schools_schools1`
    FOREIGN KEY (`schools_name`)
    REFERENCES `mydata`.`schools` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teachers_has_schools_teachers1`
    FOREIGN KEY (`teachers_teacher_id`)
    REFERENCES `mydata`.`teachers` (`teacher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
