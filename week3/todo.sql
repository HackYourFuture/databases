DROP database IF EXISTS todo_app;
CREATE database todo_app;
USE todo_app;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE todo_lists (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    created_at date,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE todo_items (
    id INT NOT NULL AUTO_INCREMENT,
    list_id INT NOT NULL,
    title VARCHAR(1000) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES todo_lists(id)
);

CREATE TABLE tags (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    title VARCHAR(256) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES todo_items(id)
);

CREATE TABLE reminders (
    id INT NOT NULL AUTO_INCREMENT,
    list_id INT NOT NULL,
    text VARCHAR(256) NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES todo_lists(id)
);

INSERT INTO users VALUES (1, 'Hiba', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO users VALUES (2, 'Tala', '4428c6c474502e61151877825bb41961');

INSERT INTO todo_lists VALUES (1, 1, 'Children School', '2018-12-01');
INSERT INTO todo_lists VALUES (2, 1, 'Shopping', '2018-12-15');
INSERT INTO todo_lists VALUES (3, 2, 'Studying', '2018-12-30');

INSERT INTO todo_items VALUES (1, 1,'Prepere the books', true);
INSERT INTO todo_items VALUES (2, 1,'Meet the teachers', true);
INSERT INTO todo_items VALUES (3, 2,'Groceries', false);
INSERT INTO todo_items VALUES (4, 2,'C&A', false);
INSERT INTO todo_items VALUES (5, 3,'Node.js', false);

INSERT INTO tags VALUES (1, 1, 'Mathe');
