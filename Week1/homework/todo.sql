

CREATE SCHEMA IF NOT EXISTS `elmira-DB` DEFAULT CHARACTER SET utf8 ;
USE `elmira-DB`;

-- create 'user' table --
CREATE TABLE IF NOT EXISTS `elmira-DB`.`user` (
    `user-id` INT AUTO_INCREMENT,
    `user-name` VARCHAR(45),
    PRIMARY KEY(`user-id`));

--crerate 'todo' table --
CREATE TABLE IF NOT EXISTS `elmira-DB`.`todo` (
    `todo-id` INT AUTO_INCREMENT,
    `todo-description` VARCHAR(45),
    PRIMARY KEY(`todo-id`));

-- create 'user_has_todo' table --
CREATE TABLE `elmira-DB`.`user_has_todo`(
    `id` INT AUTO_INCREMENT,
    `user_user-id` INT,
    `todo-list_todo-id` INT,
    `as-done` TINYINT,
    `comment` VARCHAR(90),
     PRIMARY KEY (`id`,`user_user-id`,`todo-list_todo-id`),
     FOREIGN KEY(`user_user-id`)REFERENCES `elmira-DB`.`user` (`user-id`),
     FOREIGN KEY(`todo-list_todo-id`)REFERENCES `elmira-DB`.`todo` (`todo-id`));


