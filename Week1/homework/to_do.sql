DROP database IF EXISTS to_do;
CREATE database to_do;
USE to_do;

CREATE TABLE users (
user_id INT PRIMARY KEY AUTO_INCREMENT,
user_name varchar(30) NOT NULL,
user_language varchar(10) NOT NULL
);

CREATE TABLE tasks (
task_id INT PRIMARY KEY AUTO_INCREMENT,
task_title varchar(30) NOT NULL,
task_status varchar(30) NOT NULL,
users INT NOT NULL,
tag INT NOT NULL,
FOREIGN KEY (users) REFERENCES users(user_id),
FOREIGN KEY (tag) REFERENCES tag(tag_id)
);

CREATE TABLE tag (
  tag_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (user_id, user_name, user_language) VALUES (1, 'Donald', 'Arabic');
INSERT INTO users (user_id, user_name, user_language) VALUES (2, 'Ward', 'Arminian');
INSERT INTO users (user_id, user_name, user_language) VALUES (3, 'Karam', 'Arabic');

INSERT INTO Tasks (task_id, users, task_title, task_status) VALUES (1, 1, 'make salad', 'done');
INSERT INTO Tasks (task_id, users, task_title, task_status) VALUES (2, 2, 'BBQ', 'done');
INSERT INTO Tasks (task_id, users, task_title, task_status) VALUES (3, 3, 'eat', 'done');