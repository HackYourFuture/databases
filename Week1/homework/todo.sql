--
-- Definition for database todo
--
DROP DATABASE IF EXISTS todo;
CREATE DATABASE todo
	CHARACTER SET utf8
	COLLATE utf8_general_ci;

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

-- 
-- Set default database
--
USE todo;

--
-- Definition for table tags
--
CREATE TABLE tags (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table users
--
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(255) DEFAULT NULL,
  user_name VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table items
--
CREATE TABLE items (
  id INT(11) NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(255) DEFAULT NULL,
  status TINYINT(1) NOT NULL DEFAULT 0,
  user_id INT(11) DEFAULT NULL,
  tag_id INT(11) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_items_tags_id FOREIGN KEY (tag_id)
    REFERENCES tags(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_items_users_id FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table tags
--

-- Table todo.tags does not contain any data (it is empty)

-- 
-- Dumping data for table users
--

-- Table todo.users does not contain any data (it is empty)

-- 
-- Dumping data for table items
--

-- Table todo.items does not contain any data (it is empty)

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;