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
