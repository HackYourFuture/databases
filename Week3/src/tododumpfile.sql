DROP SCHEMA IF EXISTS todoapp;
CREATE SCHEMA todoapp;
USE todoapp;
DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  `User_Id` varchar
(50) NOT NULL,
  `Name` varchar
(50) NOT NULL,
  `Email` varchar
(254) NOT NULL,
  PRIMARY KEY
(`User_Id`,`Email`)
);
LOCK TABLES `users` WRITE;
INSERT INTO 
users
VALUES
  ('HCN4HAjIj3lIKB9tb9doc', 'lolo1', 'lolo1@gmail.com'),
  ('Hk0yPR8DvmIC7WYOvDkgP', 'lolo2', 'lolo2@gmail.com'),
  ('KHuSxKyVy6AGwuIW3-o1y', 'lolo3', 'lolo3@gmail.com');
UNLOCK TABLES;
DROP TABLE IF EXISTS todolists;
CREATE TABLE todolists
(
  `User_Id` varchar
(50) NOT NULL,
  `ToDoList_Id` varchar
(50) NOT NULL,
  `ToDoList_Name` varchar
(50) NOT NULL,
  `Reminder` datetime DEFAULT NULL,
  PRIMARY KEY
(`ToDoList_Id`),
  FOREIGN KEY
(`User_Id`) REFERENCES `users`
(`User_Id`) ON
DELETE CASCADE
)
;
LOCK TABLES `todolists` WRITE;
INSERT INTO 
todolists
VALUES
  ('Hk0yPR8DvmIC7WYOvDkgP', '0U8YAoKhi31TGu9BHPYjt', 'furniture', '2019-10-02 00:00:00'),
  ('KHuSxKyVy6AGwuIW3-o1y', 'BvDSlKNJeadmhjtyANlBG', 'fruits', '2019-10-02 00:00:00'),
  ('HCN4HAjIj3lIKB9tb9doc', 'MsOjgJCz0KuUQ9z_4NTUu', 'language', '2019-09-02 00:00:00');
UNLOCK TABLES;
DROP TABLE IF EXISTS todos;
CREATE TABLE todos
(
  `ToDoList_Id` varchar
(50) NOT NULL,
  `Todo_Id` varchar
(50) NOT NULL,
  `Todo_Name` varchar
(100) NOT NULL,
  `Done` enum
('true','false') DEFAULT 'false',
  `Due_date` datetime DEFAULT NULL,
  `Tag` varchar
(50) DEFAULT NULL,
  PRIMARY KEY
(`Todo_Id`),
  FOREIGN KEY
(`ToDoList_Id`) REFERENCES `todolists`
(`ToDoList_Id`) ON
DELETE CASCADE
);
LOCK TABLES `todos` WRITE;
INSERT INTO 
todos
VALUES
  ('0U8YAoKhi31TGu9BHPYjt', '-lN3LY3dCMjGWuMStvhKS', 'buy 2 seat sofa', 'false', '2019-05-11 00:00:00', 'important'),
  ('BvDSlKNJeadmhjtyANlBG', '0Zl3I9F7pahr60VchlB4S', 'complete the new book', 'false', '2019-05-11 00:00:00', 'important'),
  ('MsOjgJCz0KuUQ9z_4NTUu', '4aAdJk8-x1D0HuIzySQn_', 'study for dutch', 'false', '2019-05-11 00:00:00', 'important'),
  ('0U8YAoKhi31TGu9BHPYjt', '73CotpwppPym2aTQkye0v', 'buy the stuff for the bedroom', 'false', '2019-05-11 00:00:00', 'important'),
  ('0U8YAoKhi31TGu9BHPYjt', 'ZUB8p0IiJJs5UrgSf0Ka8', 'buy the carpets and curtains', 'false', '2019-05-11 00:00:00', 'important');
UNLOCK TABLES;