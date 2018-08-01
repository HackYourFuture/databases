

CREATE DATABASE coding_course
DEFAULT CHARACTER
SET utf8mb4 ;
USE coding_course;


CREATE TABLE `user`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `email` VARCHAR (255) NOT NULL,
  `password` VARCHAR (255) NOT NULL
);

CREATE TABLE `teacher` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `email` VARCHAR (255) NOT NULL,
  `password` VARCHAR (255) NOT NULL
);

CREATE TABLE `course` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_name` TEXT NOT NULL,
  `course_description` TEXT NOT NULL,
  `teacher_id` INT NOT NULL,
 FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
);

CREATE TABLE `user_course` (
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
   FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
   FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
   PRIMARY KEY (`course_id`,`user_id`)
);

CREATE TABLE `badge` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `description` TEXT NOT NULL
);


CREATE TABLE `user_badge` (
  `badge_id` INT NOT NULL,
  `user_id` INT NOT NULL,
   FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`),
   FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
   PRIMARY KEY (`badge_id`,`user_id`)
);
