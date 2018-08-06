CREATE DATABASE todo;
use todo;

CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255),
  `done` ENUM('done', 'not done') DEFAULT 'not done',
  `deadline` DATETIME,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

CREATE TABLE `Tag` (
  `user_id` INT NOT NULL, -- this is redundent cause we can get the user id from the todo id
  `todo_id` INT NOT NULL,
  `tag_category` VARCHAR(255),
  FOREIGN KEY (`todo_id`) REFERENCES `Todo`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

CREATE TABLE `Help` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creator_id` INT NOT NULL,
  `helper_id` INT,
  PRIMARY KEY (`id`);
)
