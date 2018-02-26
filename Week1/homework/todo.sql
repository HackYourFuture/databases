DROP DATABASE IF EXISTS todos;
CREATE DATABASE todos;
USE todos;
CREATE TABLE Users (
    UserId int UNIQUE AUTO_INCREMENT NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    YearOfBirth year,
    Country varchar(50),
    Email varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (UserId)
);

CREATE TABLE Tasks (
    Id int NOT NULl UNIQUE AUTO_INCREMENT,
    UserId int NOT NULl,
    Description varchar(75) NOT NULL,
    Tag varchar(75),
    Done varchar(75),
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) 
);

INSERT INTO Users (FirstName,LastName,YearOfBirth,Country,Email) VALUES ('Matt', 'Ramon','1980','Iceland','Matt-Ram@hotmail.com');
INSERT INTO Users (FirstName,LastName,Email) VALUES ('Joe', 'Doe', 'joe-doe@hotmail.com');
INSERT INTO Users (FirstName,LastName,Country,Email) VALUES ('Lara', 'Skatler','Germany' ,'Lara-S@hotmail.com');
INSERT INTO Users (FirstName,LastName,YearOfBirth,Email) VALUES ('Dan', 'Danader','1975', 'Dan-Dander@hotmail.com');
INSERT INTO Users (FirstName,LastName,YearOfBirth,Country,Email) VALUES ('Sam', 'Samon','1995','USA', 'Sam-Samon@hotmail.com');


INSERT INTO Tasks (UserId,Description) VALUES (3,'Doing laundry');
INSERT INTO Tasks (UserId,Description,Done) VALUES (2,'Washing dishes','done');
INSERT INTO Tasks (UserId,Description,Tag) VALUES (1,'buying groceries', 'grocery');
INSERT INTO Tasks (UserId,Description,Tag,Done) VALUES (4,'do shopping', 'shopping', 'done');
INSERT INTO Tasks (UserId,Description) VALUES (1,'driving lesson');
INSERT INTO Tasks (UserId,Description,Tag) VALUES (5,'studying','homework');
INSERT INTO Tasks (UserId,Description,Done) VALUES (4,'cleaning the house', 'done');