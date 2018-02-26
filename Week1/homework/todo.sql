CREATE DATABASE todo;


CREATE TABLE Users (
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(75) NOT NULL,
    las_name VARCHAR(100) NOT NULL
)ENGINE=INNODB;

CREATE TABLE Task (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_name VARCHAR(100) NOT NULL,
    catagory VARCHAR(100),
    status BOOLEAN,
    created_date DATE ,
    FOREIGN KEY (user_id)
        REFERENCES Users (ID)
        ON UPDATE CASCADE 
	ON DELETE RESTRICT
)ENGINE=INNODB;



CREATE TABLE Todo_list (
    Todo_list_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    Todo_list_name VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES Users (ID)
        ON UPDATE CASCADE 
        ON DELETE RESTRICT

)ENGINE=INNODB;

CREATE TABLE todo_list_has_task (
    task_id INT NOT NULL,
    Todo_list_id INT NOT NULL,
	FOREIGN KEY (task_id) REFERENCES Task (ID),
     	FOREIGN KEY (Todo_list_id) REFERENCES Todo_list (Todo_list_id),
	PRIMARY KEY (task_id , Todo_list_id)
)ENGINE=INNODB;



































