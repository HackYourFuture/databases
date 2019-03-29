DROP DATABASE IF EXISTS `toDoApp`;
CREATE DATABASE `toDoApp`;
USE `toDoApp`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (Id)
);

DROP TABLE IF EXISTS `toDoList`;
CREATE TABLE `toDoList` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `UserID` INT(11) DEFAULT NULL,
  `Name` VARCHAR(100) NOT NULL,
  `Reminder` DATETIME DEFAULT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`)
);

DROP TABLE IF EXISTS `toDos`;
CREATE TABLE `toDos` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` TEXT NOT NULL,
  `ListID` INT(11) DEFAULT NULL, 
  `IsDone` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`ListID`) REFERENCES `toDoList` (`Id`)
);


INSERT INTO `users` (`Name`) VALUES ('Unmesh');
INSERT INTO `users` (`Name`) VALUES ('Jim');
INSERT INTO `users` (`Name`) VALUES ('Wouter');
INSERT INTO `users` (`Name`) VALUES ('Sara');


INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (1, 'Shopping', '2019-04-03 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (1, 'Sport', '2019-04-02 08:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (2, 'Work', '2019-04-08 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (2, 'Shopping', '2019-04-09 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (3, 'Vacation', '2019-04-05 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (3, 'Work', '2019-04-15 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (4, 'Shopping', '2019-04-09 12:00:10');
INSERT INTO `toDoList` (`userID`, `Name`, `Reminder`) VALUES (4, 'Sport', '2019-04-05 12:00:10');


INSERT INTO `toDos` (`Name`, `ListID`) VALUES ('Buy Milk', 1);
INSERT INTO `toDos` (`Name`, `ListID`) VALUES ('Go running', 2);
INSERT INTO `toDos` (`Name`, `ListID`) VALUES ('Buy Milk', 2);
INSERT INTO `toDos` (`Name`, `ListID`) VALUES ('Make Project', 3);
INSERT INTO `toDos` (`Name`, `ListID`) VALUES ('Buy Milk', 4);