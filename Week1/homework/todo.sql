DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo;
use todo;

CREATE TABLE `User`(
    `Id` INT(11) NOT NULL AUTO_INCREMENT,
    `FirstName` CHAR(25) NOT NULL,
    `LastName` CHAR(25) NOT NULL,
    `Username` CHAR(25) NOT NULL,
    `Password` CHAR(25) NOT NULL,
    `Email` CHAR(50) NOT NULL,
    `LastLogin` DATETIME(6) NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `List`(
    `Id` INT(11) NOT NULL AUTO_INCREMENT,
    `Name` CHAR(25) NOT NULL,
    `Created` DATETIME(6) NOT NULL,
    `Modified` DATETIME(6) NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `ToDo`(
    `Id` INT(11) NOT NULL AUTO_INCREMENT,
    `Listid` INT(11) NOT NULL,
    `Text` TEXT NOT NULL,
    `Tag` CHAR(25),
    `Done` enum('T','F') NOT NULL DEFAULT 'F',
    `Created` DATETIME(6) NOT NULL,
    `Modified` DATETIME(6) NOT NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`Listid`) REFERENCES `List` (`Id`)
);

CREATE TABLE `ListOwner`(
    `Listid` INT(11) NOT NULL,
    `UserId` INT(11) NOT NULL,
    PRIMARY KEY (`Listid`,`UserId`),
    FOREIGN KEY (`Listid`) REFERENCES `List` (`Id`),
    FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`)
);