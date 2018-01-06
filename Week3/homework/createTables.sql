CREATE DATABASE `Hotel`;
USE 'Hotel';

CREATE TABLE `Branch`(
    `branch_name` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `total_rooms` INT NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`branch_name`)
);

CREATE TABLE `Staff`(
    `staff_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(45) NULL,
    `city` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`staff_id`)
);


CREATE TABLE `Guest`(
    `guest_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(45) NULL,
    `address` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`guest_id`)
);

CREATE TABLE `reservation` (
    `reservation_id` INT NOT NULL AUTO_INCREMENT,
    `date` DATE NULL,
    `check_in_date` DATE NULL,
    `check_out_date` DATE NULL,
    `guest_id` INT NOT NULL,
    PRIMARY KEY (`reservation_id`),
    FOREIGN KEY (`guest_id`) REFERENCES `Guest` (`guest_id`)
);

-- error
CREATE TABLE `Room`(
    `room_number` INT NOT NULL AUTO_INCREMENT,
    `floor` INT NULL,
    `surface` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `reservation_id` INT NULL,
    `branch_name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`room_number`),
    FOREIGN KEY (`reservation_id`) REFERENCES `Reservation`(`reservation_id`),
    FOREIGN KEY (`branch_name`) REFERENCES `Branch` (`branch_name`)
);

CREATE TABLE `function` (
    `function` VARCHAR(45) NOT NULL,
    `salary` DOUBLE NOT NULL,
    PRIMARY KEY (`function`)
);


CREATE TABLE `Function_Staff`(
    `function` VARCHAR(45) NOT NULL,
    `staff_id` INT NOT NULL,
    PRIMARY KEY (`function`, `staff_id`),
    FOREIGN KEY (`staff_id`) REFERENCES `Staff`(`staff_id`),
    FOREIGN KEY (`function`) REFERENCES `function`(`function`)
);

CREATE TABLE `Branch_Staff` (
    `staff_id` INT NOT NULL,
    `branch_name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`staff_id`, `branch_name`),
    FOREIGN KEY (`staff_id`) REFERENCES `Staff`(`staff_id`),
    FOREIGN KEY (`branch_name`) REFERENCES `Branch` (`branch_name`)
);