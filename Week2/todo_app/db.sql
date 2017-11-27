DROP database IF EXISTS todo_app;
CREATE database todo_app;
USE todo_app;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(1000) NOT NULL,
    last_name VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE todo_items(
    id INT NOT NULL AUTO_INCREMENT,
    text TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT,
    description varchar(255) DEFAULT '',
    PRIMARY KEY(id)
);

CREATE TABLE todo_item_tag(
    todo_item_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (todo_item_id, tag_id)
);


INSERT INTO users (first_name, last_name) VALUES ('Maartje', 'Kruijt');
INSERT INTO users (first_name, last_name) VALUES ('Joost', 'Lubach');
INSERT INTO users (first_name, last_name) VAlUES ('Jim', 'Cramer');
INSERT INTO users (first_name, last_name) VAlUES ('Frank', 'Versnel');

INSERT INTO tags (description) VALUES ('teaching');
INSERT INTO tags (description) VALUES ('shopping');
INSERT INTO tags (description) VALUES ('school');

-- tags: teaching, school
INSERT INTO todo_items (id, text, user_id) 
VALUES (42, 'Teach class 11 about databases', 4);

-- tags: school
INSERT INTO todo_items (text, user_id) 
VALUES ('Create database week 2 homework', 4);

-- no tags
INSERT INTO todo_items (text, user_id) 
VALUES ('Do the dishes', 3);

INSERT INTO todo_items (text, user_id) 
VALUES ('Teach class 11 about javascript', 2);

INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (42, 3);
INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (42, 1);
INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (43, 3);
INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (45, 3);
INSERT INTO todo_item_tag (todo_item_id, tag_id) VALUES (45, 1);