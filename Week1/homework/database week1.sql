CREATE DATABASE todo;
use todo;

CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Todo (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(255),
  is_done BOOLEAN DEFAULT 0,
  deadline DATETIME,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Tag (
  user_id INT NOT NULL,
  todo_id INT NOT NULL,
  tag_category VARCHAR(255),
  FOREIGN KEY (todo_id) REFERENCES Todo(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Help (
  id INT NOT NULL AUTO_INCREMENT,
  creator_id INT NOT NULL,
  helper_id INT,
  PRIMARY KEY (id);
)
