DROP DATABASE IF EXISTS nodemy;
CREATE DATABASE nodemy;
USE nodemy;
DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
DROP TABLE IF EXISTS `list`;
CREATE TABLE list (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT `list_fk_1` FOREIGN KEY(user_id) REFERENCES users(id)
);
DROP TABLE IF EXISTS `listItem`;
CREATE TABLE listItem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    item_header VARCHAR(255) NOT NULL,
    item_body VARCHAR(255) NOT NULL,
    list_id INTEGER NOT NULL,
    CONSTRAINT `listItem_fk_1` FOREIGN KEY(list_id) REFERENCES list(id)
);
DROP TABLE IF EXISTS `tags`;
CREATE TABLE tags (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255) UNIQUE,
    item_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT `tags_fk_1` FOREIGN KEY(item_id) REFERENCES listItem(id)
);
DROP TABLE IF EXISTS `mark`;
CREATE TABLE mark(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    done ENUM('T', 'F') NOT NULL DEFAULT 'F',
    item_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT `mark_fk_1` FOREIGN KEY(item_id) REFERENCES listItem(id)
);
DROP TABLE IF EXISTS `reminder`;
CREATE TABLE reminder(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    startdate DATETIME NOT NULL,
    enddate DATETIME NOT NULL,
    item_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT `reminder_fk_1` FOREIGN KEY(item_id) REFERENCES listItem(id)
);
INSERT INTO
    users(username)
VALUES('Tom');
INSERT INTO
    users(username)
VALUES('Mike');
INSERT INTO
    users(username)
VALUES('John');
INSERT INTO
    users(username)
VALUES('Albert');
INSERT INTO
    list(list_name, user_id)
VALUES('Shopping list', 1);
INSERT INTO
    list(list_name, user_id)
VALUES('Planned list', 1);
INSERT INTO
    list(list_name, user_id)
VALUES('Progress list', 2);
INSERT INTO
    list(list_name, user_id)
VALUES('renting items', 3);
INSERT INTO
    list(list_name, user_id)
VALUES('pets', 3);
INSERT INTO
    list(list_name, user_id)
VALUES('Gaming list', 4);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('hello', 'user1 list1', 1);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('iyyy', 'user1 list2', 2);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('boooo', 'user2 list1', 3);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('hi', 'user3 list1', 4);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('haha', 'user3 list2', 5);
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('heyy', 'user4 list1', 6);
INSERT INTO
    `reminder` (id, title, startdate, enddate, item_id)
VALUES
    (
        1,
        'This is reminder',
        '2019-09-24 19:25:44',
        '2015-10-21',
        1
    );- -
select
    *
from
    users
    join listItem on username = 'albert'
    and listItem.list_id = 6;- -
select
    *
from
    users
    join list on username = 'albert'
    and list.user_id = 4;- -
select
    *
from
    users
    join reminder on username = 'Tom' = 1
    and item_id = 1;- -
INSERT INTO
    listItem(item_header, item_body, list_id)
VALUES('hola', 'user3 list2', 6);- -
INSERT INTO
    listItem (item_header, item_body, list_id)
VALUES
    ('test1', 'user3 list5', 8);- -
INSERT INTO
    listItem (item_header, item_body, list_id)
VALUES
    ('test2', 'user4 list1', 6);- -
select
    *
from
    users
    join list
    join listItem on users.id = list.user_id
    and list.user_id = listItem.list_id
    and username = 'tom';- -
select
    *
from
    users
    join list
    join listItem on users.id = list.user_id
    and list.user_id = listItem.list_id
    and username = 'mike';- -
select
    *
from
    users
    join list
    join listItem on users.id = list.user_id
    and list.user_id = listItem.list_id
    and username = 'john';- -
select
    *
from
    users
    join list
    join listItem on users.id = list.user_id
    and list.user_id = listItem.list_id
    and username = 'albert';