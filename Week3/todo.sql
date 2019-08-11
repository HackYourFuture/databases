DROP SCHEMA IF EXISTS todo;
CREATE SCHEMA todo;
USE todo;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` CHAR(40) NOT NULL DEFAULT '',
  `Email` CHAR(50) DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `User` VALUES (1,'mike','mike@mail.com');
INSERT INTO `User` VALUES (2,'john','john@omail.com');
INSERT INTO `User` VALUES (3,'nick','nick@nomail.com');
INSERT INTO `User` VALUES (4,'sarah','sarah@mail.com');
INSERT INTO `User` VALUES (5,'maria','maria@dbmail.com');
INSERT INTO `User` VALUES (6,'kate','kate@nomail.com');
INSERT INTO `User` VALUES (7,'jack','jack@omail.com');
INSERT INTO `User` VALUES (8,'michelle','michelle@nomail.com');
INSERT INTO `User` VALUES (9,'rose','rose@dbmail.com');
INSERT INTO `User` VALUES (10,'brad','brad@mailcom');


DROP TABLE IF EXISTS `TodoList`;

CREATE TABLE `TodoList` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` CHAR(40) NOT NULL DEFAULT '',
  `User_ID` INT(11) NOT NULL,
  `Reminder_ID` INT(11),
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `TodoList` ADD FOREIGN KEY (`Reminder_ID`) REFERENCES `Reminder` (`ID`);

INSERT INTO `TodoList` VALUES (1,'list-1',1,1);
INSERT INTO `TodoList` VALUES (2,'list-2',2,2);
INSERT INTO `TodoList` VALUES (3,'list-3',3,3);
INSERT INTO `TodoList` VALUES (4,'list-4',4,4);
INSERT INTO `TodoList` VALUES (5,'list-5',5,5);
INSERT INTO `TodoList` VALUES (6,'list-6',6,6);
INSERT INTO `TodoList` VALUES (7,'list-7',7,7);
INSERT INTO `TodoList` VALUES (8,'list-8',8,8);
INSERT INTO `TodoList` VALUES (9,'list-9',9,9);
INSERT INTO `TodoList` VALUES (10,'list-10',10,10);
INSERT INTO `TodoList` VALUES (11,'list-11',2,11);
INSERT INTO `TodoList` VALUES (12,'list-12',2,12);
INSERT INTO `TodoList` VALUES (13,'list-13',4,13);

DROP TABLE IF EXISTS `Reminder`;

CREATE TABLE `Reminder` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Date` TIMESTAMP NOT NULL,
  `Notification` CHAR(80) NOT NULL DEFAULT '',
  `List_ID` INT(11) NOT NULL,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`List_ID`) REFERENCES `TodoList` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Reminder` VALUES (1,'2019-09-01 09:00:00','hurry up!',1);
INSERT INTO `Reminder` VALUES (2,'2019-10-01 09:00:00','schedule task',2);
INSERT INTO `Reminder` VALUES (3,'2019-09-01 09:00:00','less sleep!',3);
INSERT INTO `Reminder` VALUES (4,'2019-11-01 09:00:00','prepare to the task',4);
INSERT INTO `Reminder` VALUES (5,'2019-12-01 09:00:00','come on!',5);
INSERT INTO `Reminder` VALUES (6,'2019-12-01 09:00:00','do alot!',6);
INSERT INTO `Reminder` VALUES (7,'2019-09-01 09:00:00','dont be lazy',7);
INSERT INTO `Reminder` VALUES (8,'2019-10-01 09:00:00','hurry up!',8);
INSERT INTO `Reminder` VALUES (9,'2019-11-01 09:00:00','work alot',9);
INSERT INTO `Reminder` VALUES (10,'2020-12-01 09:00:00','work hard',10);
INSERT INTO `Reminder` VALUES (11,'2020-12-01 09:00:00','schedule task',11);
INSERT INTO `Reminder` VALUES (12,'2019-11-01 09:00:00','less sleep!',12);
INSERT INTO `Reminder` VALUES (13,'2019-10-01 09:00:00','run run!',13);

DROP TABLE IF EXISTS `TodoItem`;

CREATE TABLE `TodoItem` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Description` CHAR(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `TodoItem` VALUES (1,'read book');
INSERT INTO `TodoItem` VALUES (2,'go to course');
INSERT INTO `TodoItem` VALUES (3,'visit uncle');
INSERT INTO `TodoItem` VALUES (4,'go to gym');
INSERT INTO `TodoItem` VALUES (5,'do homework');
INSERT INTO `TodoItem` VALUES (6,'go to restaurant');
INSERT INTO `TodoItem` VALUES (7,'hanging out with friends');
INSERT INTO `TodoItem` VALUES (8,'fix the bike');
INSERT INTO `TodoItem` VALUES (9,'make a cake');
INSERT INTO `TodoItem` VALUES (10,'watch movie');
INSERT INTO `TodoItem` VALUES (11,'preapre exam');
INSERT INTO `TodoItem` VALUES (12,'go to cinema');
INSERT INTO `TodoItem` VALUES (13,'prepare interview');
INSERT INTO `TodoItem` VALUES (14,'give speech');
INSERT INTO `TodoItem` VALUES (15,'swim in the pool');
INSERT INTO `TodoItem` VALUES (16,'go safari');
INSERT INTO `TodoItem` VALUES (17,'buy clothes');

DROP TABLE IF EXISTS `ListItem`;

CREATE TABLE `ListItem` (
  `List_ID` INT(11) NOT NULL,
  `Item_ID` INT(11) NOT NULL,
  `IsCompleted` enum('T','F') NOT NULL DEFAULT 'F',
  PRIMARY KEY (`List_ID`, `Item_ID`),
  FOREIGN KEY (`List_ID`) REFERENCES `TodoList` (`ID`),
  FOREIGN KEY (`Item_ID`) REFERENCES `TodoItem` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `ListItem` VALUES (1,1,'F');
INSERT INTO `ListItem` VALUES (2,2,'F');
INSERT INTO `ListItem` VALUES (3,3,'F');
INSERT INTO `ListItem` VALUES (4,4,'T');
INSERT INTO `ListItem` VALUES (5,5,'F');
INSERT INTO `ListItem` VALUES (6,6,'F');
INSERT INTO `ListItem` VALUES (7,7,'F');
INSERT INTO `ListItem` VALUES (8,8,'F');
INSERT INTO `ListItem` VALUES (9,9,'F');
INSERT INTO `ListItem` VALUES (10,10,'F');
INSERT INTO `ListItem` VALUES (1,2,'F');
INSERT INTO `ListItem` VALUES (1,5,'F');
INSERT INTO `ListItem` VALUES (2,4,'T');
INSERT INTO `ListItem` VALUES (3,7,'F');
INSERT INTO `ListItem` VALUES (4,6,'F');
INSERT INTO `ListItem` VALUES (5,5,'F');
INSERT INTO `ListItem` VALUES (6,6,'F');
INSERT INTO `ListItem` VALUES (7,11,'F');
INSERT INTO `ListItem` VALUES (7,15,'F');
INSERT INTO `ListItem` VALUES (8,14,'T');
INSERT INTO `ListItem` VALUES (9,12,'F');
INSERT INTO `ListItem` VALUES (10,14,'F');
INSERT INTO `ListItem` VALUES (10,4,'F');
INSERT INTO `ListItem` VALUES (3,16,'F');
INSERT INTO `ListItem` VALUES (4,17,'F');
INSERT INTO `ListItem` VALUES (5,17,'F');
INSERT INTO `ListItem` VALUES (8,11,'F');
INSERT INTO `ListItem` VALUES (9,14,'F');
INSERT INTO `ListItem` VALUES (3,2,'T');
INSERT INTO `ListItem` VALUES (3,1,'F');
INSERT INTO `ListItem` VALUES (11,3,'F');
INSERT INTO `ListItem` VALUES (12,4,'F');
INSERT INTO `ListItem` VALUES (13,6,'T');
INSERT INTO `ListItem` VALUES (11,12,'F');
INSERT INTO `ListItem` VALUES (12,14,'F');
INSERT INTO `ListItem` VALUES (12,15,'F');
INSERT INTO `ListItem` VALUES (13,9,'F');

DROP TABLE IF EXISTS `Tag`;

CREATE TABLE `Tag` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` CHAR(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Tag` VALUES (1,'personel improvement');
INSERT INTO `Tag` VALUES (2,'studying');
INSERT INTO `Tag` VALUES (3,'socializing');
INSERT INTO `Tag` VALUES (4,'shopping');
INSERT INTO `Tag` VALUES (5,'traveling');
INSERT INTO `Tag` VALUES (6,'relaxing');
INSERT INTO `Tag` VALUES (7,'working');
INSERT INTO `Tag` VALUES (8,'doing sport');
INSERT INTO `Tag` VALUES (9,'discovering');
INSERT INTO `Tag` VALUES (10,'searching');
INSERT INTO `Tag` VALUES (11,'familying!');
INSERT INTO `Tag` VALUES (12,'cooking');

DROP TABLE IF EXISTS `ItemTag`;

CREATE TABLE `ItemTag` (
  `Item_ID` INT(11) NOT NULL,
  `Tag_ID` INT(11) NOT NULL,
  PRIMARY KEY (`Item_ID`, `Tag_ID`),
  FOREIGN KEY (`Item_ID`) REFERENCES `TodoItem` (`ID`),
  FOREIGN KEY (`Tag_ID`) REFERENCES `Tag` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `ItemTag` VALUES (1,1);
INSERT INTO `ItemTag` VALUES (2,2);
INSERT INTO `ItemTag` VALUES (3,11);
INSERT INTO `ItemTag` VALUES (4,8);
INSERT INTO `ItemTag` VALUES (5,2);
INSERT INTO `ItemTag` VALUES (6,6);
INSERT INTO `ItemTag` VALUES (7,3);
INSERT INTO `ItemTag` VALUES (8,7);
INSERT INTO `ItemTag` VALUES (9,12);
INSERT INTO `ItemTag` VALUES (10,6);
INSERT INTO `ItemTag` VALUES (11,2);
INSERT INTO `ItemTag` VALUES (12,6);
INSERT INTO `ItemTag` VALUES (13,10);
INSERT INTO `ItemTag` VALUES (14,10);
INSERT INTO `ItemTag` VALUES (15,8);
INSERT INTO `ItemTag` VALUES (3,5);
INSERT INTO `ItemTag` VALUES (4,3);
INSERT INTO `ItemTag` VALUES (5,10);
INSERT INTO `ItemTag` VALUES (5,3);
INSERT INTO `ItemTag` VALUES (7,6);
INSERT INTO `ItemTag` VALUES (12,3);
INSERT INTO `ItemTag` VALUES (13,2);
INSERT INTO `ItemTag` VALUES (13,1);
INSERT INTO `ItemTag` VALUES (14,1);
INSERT INTO `ItemTag` VALUES (15,6);
INSERT INTO `ItemTag` VALUES (16,9);
INSERT INTO `ItemTag` VALUES (16,6);
INSERT INTO `ItemTag` VALUES (16,3);
INSERT INTO `ItemTag` VALUES (17,4);
INSERT INTO `ItemTag` VALUES (17,9);

