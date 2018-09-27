DROP database IF EXISTS to_do;
CREATE database to_do;
USE to_do;

CREATE TABLE Users (
user_Id INT NOT NULL,
user_name varchar(30) NOT NULL,
user_language varchar(10) NOT NULL,
PRIMARY KEY (user_Id)
);

CREATE TABLE Tasks (
task_Id INT NOT NULL,
user_task INT NOT NULL,
task_name varchar(30) NOT NULL,
task_status varchar(10) NOT NULL,
PRIMARY KEY (task_Id),
FOREIGN KEY (user_task) REFERENCES Users(user_Id)
);

INSERT INTO Users (user_Id, user_name, user_language) VALUES (1, 'Donald', 'Arabic');
INSERT INTO Users (user_Id, user_name, user_language) VALUES (2, 'Ward', 'Arminian');
INSERT INTO Users (user_Id, user_name, user_language) VALUES (3, 'Karam', 'Arabic');

INSERT INTO Tasks (task_Id, user_task, task_name, task_status) VALUES (1, 2, 'make salad', 'done');
INSERT INTO Tasks (task_Id, user_task, task_name, task_status) VALUES (2, 1, 'BBQ', 'done');
INSERT INTO Tasks (task_Id, user_task, task_name, task_status) VALUES (3, 3, 'eat', 'done');

