DROP database IF EXISTS to_do;

CREATE database to_do;
USE to_do;

CREATE TABLE users (
     user_id INT(11) NOT NULL AUTO_INCREMENT,
     user_name VARCHAR(45) NOT NULL,
     user_city VARCHAR(45) NOT NULL,
     PRIMARY KEY (user_id)
);


INSERT INTO users (user_id, user_name, user_city) VALUES (1,'Arthur','Haarlem');
INSERT INTO users (user_id, user_name, user_city) VALUES (2, 'David','Zaandam');
INSERT INTO users (user_id, user_name, user_city) VALUES (3, 'Piet','Den-Helder');

CREATE TABLE tasks (
    task_id INT(11) AUTO_INCREMENT,
    task_name VARCHAR(45) NOT NULL,
    user INT(11) NOT NULL,
    task_done VARCHAR(45) NOT NULL,
    PRIMARY KEY (task_id),
    FOREIGN KEY (user) REFERENCES users(user_id)
    
);

INSERT INTO tasks ( task_name, user, task_done) VALUES ( 'Buy Groceries', 2, false);
INSERT INTO tasks ( task_name, user, task_done) VALUES ( 'Swim', 3, false);
INSERT INTO tasks ( task_name, user, task_done) VALUES ( 'Alkmaar Biliard', 2, false);
INSERT INTO tasks ( task_name, user, task_done) VALUES ( 'Tech-event Friday', 1, false);

