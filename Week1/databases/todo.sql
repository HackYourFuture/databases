CREATE TABLE users (
    userID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    username VARCHAR (255),
    password CHAR (10),
    PRIMARY KEY (userID)
);

CREATE TABLE todos (
    itemID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    item_text VARCHAR (255),
    issue_date date,
    dead_line date,
    mark CHAR (10),
    FOREIGN KEY (userID),
    PRIMARY KEY (itemID)
);

CREATE TABLE tagged_todo (
    itemID INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR (255),
    FOREIGN KEY (itemID),
    FOREIGN KEY (userID),
    CONSTRAINT taggedID PRIMARY KEY (itemID, userID)
);

INSERT INTO users (first_name, last_name, username, password) VALUES ('neveen', 'Atik', 'natik', 'Natik18');

INSERT INTO todos (item_text, issue_date, dead_line, mark) VALUES ('handle homework', '2018-07-16', '2018-07-19', 'not done');

INSERT INTO tagged_todo (tag_name) VALUES ('homework');
