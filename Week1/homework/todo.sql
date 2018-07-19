CREATE SCHEMA
IF NOT EXISTS `tododb` DEFAULT CHARACTER SET utf8mb4 ;
USE `tododb` ;

CREATE TABLE `User` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(35),
  `Email` VARCHAR(255) ,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Todo` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(255),
  `Deadline` DATETIME,
  `Done` ENUM('T','F')  DEFAULT 'F',
  `Notification` VARCHAR(255),
  `User_id` INT,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`User_id`)
 REFERENCES `User` (`ID`)
);

CREATE TABLE `Tag` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Todo_tag` (
  `User_id_todo` INT NOT NULL,
  `Todo_id` INT NOT NULL,
  `Tag_id` INT NOT NULL,
   FOREIGN KEY (`Tag_id`)
 REFERENCES `Tag` (`ID`),
   FOREIGN KEY (`Todo_id` , `User_id_todo`)
 REFERENCES `Todo` (`ID` , `User_id`)
);


