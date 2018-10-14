DROP database IF EXISTS todo_app2;
CREATE database todo_app2;
USE todo_app2;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(1000) NOT NULL,
    last_name VARCHAR(1000) NOT NULL,
    email VARCHAR(1000) NOT NULL,
    password varchar(255) NOT NUll,
    PRIMARY KEY (id)
);

INSERT INTO users (first_name, last_name, email,password) VALUES ('Maartje', 'Kruijt', 'maartje@live.com',123);
INSERT INTO users (first_name, last_name,email,password) VALUES ('Joost', 'Lubach','joost@live.com',123 );
INSERT INTO users (first_name, last_name,email,password) VAlUES ('Jim', 'Cramer','jim@live.com',123);
INSERT INTO users (first_name, last_name,email,password) VAlUES ('Frank', 'Versnel', 'frank@live.com',123);