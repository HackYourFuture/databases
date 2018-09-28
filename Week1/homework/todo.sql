CREATE TABLE
IF NOT EXISTS `mydb`.`user`
(
  `Id user` INT  NULL,
  `FIrst name` VARCHAR
(20) NULL,
  `Last name` VARCHAR
(20) NULL,
  PRIMARY KEY
(`Id user`))




-- Table `mydb`.`TODO`

CREATE TABLE
IF NOT EXISTS `mydb`.`TODO`
( `id` INT NULL,
  `title` VARCHAR
(20) NULL,
  `description` VARCHAR
(45) NULL,
  `status` VARCHAR
(4) NULL,
  `id user` INT NULL,
  PRIMARY KEY
(`id`))