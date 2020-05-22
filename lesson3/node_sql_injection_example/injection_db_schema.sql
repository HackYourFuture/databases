SET NAMES utf8mb4;

CREATE DATABASE `injection_app` COLLATE utf8mb4_unicode_ci;

CREATE USER 'injection_app'@'%' IDENTIFIED BY 'injection123';
GRANT ALL PRIVILEGES ON `injection_app`.* TO 'injection_app'@'%';
FLUSH PRIVILEGES;

USE `injection_app`;

CREATE TABLE `users` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE KEY,
	`password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`name`, `email`, `password`) VALUES ('John Doe', 'foo@example.com', 'password');
