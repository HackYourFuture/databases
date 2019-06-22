DROP SCHEMA IF EXISTS tododatabase;
CREATE SCHEMA tododatabase;
USE tododatabase;

DROP TABLE IF EXISTS users;
create table users (`ID` int(11) NOT NULL AUTO_INCREMENT  ,`FirstName` varchar(255) NOT NULL , `LastName` varchar(255) NOT NULL, `Age` int (50) NOT NULL , `Address` varchar(255) NOT NULL, `Email` varchar(255) NOT NULL , PRIMARY KEY (`ID`) );
insert into users (`FirstName` ,`LastName` ,`Age`,`Address`, `Email`) values ('Leanne','Graham',25,'Kulas Light street 566','Sincere@april.biz');
insert into users (`FirstName` ,`LastName` ,`Age`,`Address`, `Email`) values ('Ervin','Howell', 21 ,'Victor Plains 879','Shanna@melissa.tv');
insert into users (`FirstName` ,`LastName` ,`Age`,`Address`, `Email`) values ('Clementine','Bauch',28,'station street','Clementine@gmail.com');
insert into users (`FirstName` ,`LastName` ,`Age`,`Address`, `Email`) values ('Chelsey','Dietrich',31,'Skiles Walks 351','Chelsey@hotmail.com');

DROP TABLE IF EXISTS category;
create table category (`ID` int(11) NOT NULL AUTO_INCREMENT  , `Title` varchar(255) NOT NULL , PRIMARY KEY (`ID`));
insert into category (`Title`) values ('atHome');
insert into category (`Title`) values ('atOffice');
insert into category (`Title`) values ('onTheBeach');

DROP TABLE IF EXISTS toDoList;
create table toDoList (`ID` int(11) NOT NULL AUTO_INCREMENT  , `Name` varchar(255) NOT NULL , `Description` varchar(255) NOT NULL,  `IsCompleted` ENUM('false', 'true') NOT NULL DEFAULT 'false', `category_id` int(11) NOT NULL, PRIMARY KEY (`ID`),  FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`) );
insert into toDoList ( `Name`,`Description`,`IsCompleted`,`category_id`) values ('cleanning' , 'clean the dishes' , 'true', 1) ;
insert into toDoList ( `Name`,`Description`,`IsCompleted`,`category_id`) values ('writing','finish the report', 'false', 2);
insert into toDoList ( `Name`,`Description`,`IsCompleted`,`category_id`) values ('programming','complete the the app programming', 'true', 2);

DROP TABLE IF EXISTS items;
create table items (`ID` int(11) NOT NULL AUTO_INCREMENT  , `Name` varchar(255) NOT NULL , `Description` varchar(255) NOT NULL , PRIMARY KEY (`ID`) );
insert into items (`Name`,`Description`) values ('shampoo','to clean hair');
insert into items (`Name`,`Description`) values ('soap','to clean hands');
insert into items (`Name`,`Description`) values ('pen','to write story');
insert into items (`Name`,`Description`) values ('part one of the app','to finish programming the first part');

DROP TABLE IF EXISTS Users_toDoList;
create table Users_toDoList (`User_ID` int(11) NOT NULL , `toDoList_ID` int(11) NOT NULL  ,  FOREIGN KEY (`User_ID`) REFERENCES `users` (`ID`) ,  FOREIGN KEY (`toDoList_ID`) REFERENCES `toDoList` (`ID`) );
insert into Users_toDoList values (2, 1);
insert into Users_toDoList values (4, 3);


DROP TABLE IF EXISTS toDoList_items;
create table toDoList_items (`Item_ID` int(11) NOT NULL , `toDoList_ID` int(11) NOT NULL ,  FOREIGN KEY (`Item_ID`) REFERENCES `items` (`ID`) ,  FOREIGN KEY (`toDoList_ID`) REFERENCES `toDoList` (`ID`) );


insert into toDoList_items values (3, 2);
insert into toDoList_items values (2, 1);
insert into toDoList_items values (4, 3);
insert into Users_toDoList values (2, 3);
insert into Users_toDoList values (4, 3);