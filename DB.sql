CREATE TABLE `author` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(35) NOT NULL,
  `country` varchar(35) NOT NULL
);

CREATE TABLE `book` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `name` varchar(35) NOT NULL,
  `year` date NOT NULL
);


CREATE TABLE `book_tag` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `book_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  FOREIGN KEY (`book_id`) REFERENCES `book` (`ID`),
  FOREIGN KEY (`tag_id`) REFERENCES `tag` (`ID`)
);

CREATE TABLE `tag` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tag` varchar(35) NOT NULL,
);
