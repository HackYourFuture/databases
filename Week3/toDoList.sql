DROP SCHEMA IF EXISTS toDoDataBase;
CREATE SCHEMA toDoDataBase;
USE toDoDataBase;

DROP TABLE IF EXISTS users;
create table users (`ID` int(11) ,`FirstName` varchar(255) , `LastName` varchar(255) , `Age` int (50) , Address varchar(255), `Email` varchar(255) , PRIMARY KEY (`ID`) );
insert into users values (1,'Leanne','Graham',25,'Kulas Light street 566','Sincere@april.biz');
insert into users values (2,'Ervin','Howell', 21 ,'Victor Plains 879','Shanna@melissa.tv');
insert into users values (3,'Clementine','Bauch',28,'station street','Clementine@gmail.com');
insert into users values (4,'Chelsey','Dietrich',31,'Skiles Walks 351','Chelsey@hotmail.com');

DROP TABLE IF EXISTS category;
create table category (`ID` int(11) , `Title` varchar(255) , PRIMARY KEY (`ID`));
insert into category values (1,'atHome');
insert into category values (2,'atOffice');
insert into category values (3,'onTheBeach');

DROP TABLE IF EXISTS toDoList;
create table toDoList (`ID` int(11) , `Name` varchar(255) , `Description` varchar(255),  `IsCompleted` boolean DEFAULT FALSE, `category_id` int(11), PRIMARY KEY (`ID`),  FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`) );
insert into toDoList values (1,'cleanning' , 'clean the dishes' , TRUE, 1) ;
insert into toDoList values (2,'writing','finish the report', FALSE, 2);
insert into toDoList values (3,'programming','complete the the app programming', TRUE, 2);

DROP TABLE IF EXISTS items;
create table items (`ID` int(11) , `Name` varchar(255) , `Description` varchar(255)  , PRIMARY KEY (`ID`) );
insert into items values (1,'shampoo','to clean hair');
insert into items values (2,'soap','to clean hands');
insert into items values (3,'pen','to write story');
insert into items values (4,'part one of the app','to finish programming the first part');

DROP TABLE IF EXISTS Users_toDoList;
create table Users_toDoList (`User_ID` int(11) , `toDoList_ID` int(11)  ,  FOREIGN KEY (`User_ID`) REFERENCES `users` (`ID`) ,  FOREIGN KEY (`toDoList_ID`) REFERENCES `toDoList` (`ID`) );
insert into Users_toDoList values (2, 1);
insert into Users_toDoList values (4, 3);


DROP TABLE IF EXISTS toDoList_items;
create table toDoList_items (`Item_ID` int(11) , `toDoList_ID` int(11) ,  FOREIGN KEY (`Item_ID`) REFERENCES `items` (`ID`) ,  FOREIGN KEY (`toDoList_ID`) REFERENCES `toDoList` (`ID`) );
insert into toDoList_items values (3, 2);
insert into toDoList_items values (2, 1);

insert into users values (5,'Mohammad','Ali',31,'One Street 113','mohammad@hotmail.com');
insert into Users_toDoList values (5, 3);
insert into toDoList_items values (4, 3);