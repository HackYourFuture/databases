CREATE TABLE `User` (
`User ID` INT AUTO_INCREMENT PRIMARY KEY,
`First Name` TEXT,
`Last Name` TEXT
);

CREATE TABLE `ToDo List` (
List_ID INT AUTO_INCREMENT PRIMARY KEY ,
List_Name TEXT NOT NULL
);

CREATE TABLE `ToDo` (
`ToDo ID` INT AUTO_INCREMENT PRIMARY KEY,
`ToDo Tag` TEXT,
`Deadline` DATETIME,
`Notes` TEXT,
`Status` enum('done', 'not done') NOT NULL
);

