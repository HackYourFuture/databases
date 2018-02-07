
CREATE DATABASE todos;
USE todos;

CREATE TABLE users (
    id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE (name)
);

CREATE TABLE todos (
    id INT NOT NULL, 
    user_id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    tag_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tags(
    id INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE todo_lists (
    id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tasks (
    id INT NOT NULL,
    todo_list_id INT NOT NULL,
    todo_id INT NOT NULL,
    status ENUM ('Done', 'Not done') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (todo_list_id) REFERENCES todo_lists (id),
    FOREIGN KEY (todo_id) REFERENCES todos (id)
);
