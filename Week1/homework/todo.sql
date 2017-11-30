


--throw existing one away
DROP SCHEMA IF EXISTS todd_app;
--create it again
CREATE SCHEMA todo_app;
USE todo_app;
SET AUTOCOMMIT=0;




-- throw table away if it exist
DROP table if exists 'users';

-- creating the users table

CREATE TABLE 'users'(
    'user_id' INT NOT NULL AUTO_INCREMENT,
    'first_name' VARCHAR(20) NOT NULL,
    'lastName' VARCHAR(20) NOT NULL
    PRIMARY KEY ('user_id'),
) ENGINE=InnoDB AUTO_INCREMENT=4080 DEFAULT CHARSET=latin1;


--inserting some records into user

INSERT INTO 'users' ('first_name', 'last_name') VALUES ('some', 'name');
INSERT INTO 'users' ('first_name', 'last_name') VALUES ('another', 'dummyName');
INSERT INTO 'users' ('first_name', 'last_name') VAlUES ('Ji', 'Darwish');



-- throw table away if it exist
DROP TABLE IF EXISTS 'todo_items';

-- creating the todo_items table
CREATE TABLE 'todo_items'(
    'todo_id' INT NOT NULL AUTO_INCREMENT,
    'todo_text' VARCHAR(200) NOT NULL,
    'todo_tag' VARCHAR(20) NOT NULL,
    'user_id' INT NOT NULL,
    PRIMARY KEY ('todos_id'),
    KEY 'user_id' ('user_id'),
    CONSTRAINT 'todo_item_fk' FOREIGN KEY ('user_id') REFERENCES 'users' ('user_id') 
) ENGINE-InnoDB AUTO_INCREMENT=4080 DEFAULT CHARSET=latin1;--ask about this



-- Inserting some stuff into the todo_items table

INSERT INTO 'todo_items' ('todo_text', 'todo_tag', 'user-id') VALUES ('wash the dishes', 'House hold', 1);
INSERT INTO 'todo_items' ('todo_text', 'todo_tag', 'user-id') VALUES ('do your homework', 'school stuff', 2);
INSERT INTO 'todo_items' ('todo_text', 'todo_tag', 'user-id') VALUES ('do whatever', 'stuff', 2);
INSERT INTO 'todo_items' ('todo_text', 'todo_tag', 'user-id') VALUES ('Get a whole day of sleeping', 'self caring stuff', 3);



-- throw table away if it exist
DROP TABLE IF EXISTS 'todo_status';

-- creating the todos_status table
CREATE TABLE 'todo_status'(
    'status_id' INT AUTO_INCREMENT NOT NULL,
    'status_text' VARCHAR(20) NOT NULL,
    'todo_id' INT NOT NULL,
    PRIMARY KEY 'status_id',
    KEY 'todo_id' ('todo_id'),
    CONSTRAINT 'todo_status_fk' FOREIGN KEY ('todo_id') REFERENCES 'todo_items' ('todo_id') 
) ENGINE=InnoDB AUTO_INCREMENT=4080 DEFAULT CHARSET=latin1;



--insert some records into the todo_status table

INSERT INTO 'todo_status' ('status_text', 'todo_id') VALUES ('DONE', 1);
INSERT INTO 'todo_status' ('status_text', 'todo_id') VALUES ('No rush', 2);
INSERT INTO 'todo_status' ('status_text', 'todo_id') VALUES ('Urgent', 3);
INSERT INTO 'todo_status' ('status_text', 'todo_id') VALUES ('Not done', 3);



