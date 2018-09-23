CREATE DATABASE IF NOT EXISTS  base_todoinfo;

USE base_todoinfo;

CREATE TABLE IF NOT EXISTS todos(
	id_todo INT NOT NULL,
    todo_description VARCHAR(255),
    dead_line DATE,
    done BOOLEAN,
    PRIMARY KEY(id_todo)
);
CREATE TABLE IF NOT EXISTS users(
	id_user INT NOT NULL,
    name VARCHAR(25),
    PRIMARY KEY(id_user),
    todos_id_todo INT NOT NULL,
    CONSTRAINT fkuser_todos
    FOREIGN KEY(todos_id_todo)
    REFERENCES todos(id_todo)
);

CREATE TABLE IF NOT EXISTS tags(
	id_tag INT NOT NULL,
    tag_name VARCHAR(255),
    PRIMARY KEY(id_tag)
);

CREATE TABLE IF NOT EXISTS todos_tags(
	todos_id_todo INT NOT NULL,
    tags_id_tag INT NOT NULL,
    PRIMARY KEY(todos_id_todo, tags_id_tag),
    CONSTRAINT fktag_todos_tag
    FOREIGN KEY(tags_id_tag)
    REFERENCES tags(id_tag),
    CONSTRAINT fktag_tag_todos
    FOREIGN KEY(todos_id_todo)
    REFERENCES todos(id_todo)
);




