CREATE database todo_app_week3;
USE todo_app_week3;


CREATE TABLE todo_items(
    id INT NOT NULL AUTO_INCREMENT,
    task_name TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)    
);

INSERT INTO todo_items (task_name) 
VALUES ('Complete Database Howework Week3');

