/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES latin1 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP SCHEMA IF EXISTS todo_app;
CREATE SCHEMA todo_app;
USE todo_app;
SET AUTOCOMMIT=0;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todo` (
  `todo_id` SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `todo` VARCHAR(255) NOT NULL DEFAULT '',
  `status` enum('T','F') NOT NULL DEFAULT 'F',
  `tag_id` SMALLINT NOT NULL DEFAULT '0',
  `user_id` SMALLINT NOT NULL DEFAULT '0',
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` VALUES (1,'Homework','F',1,1);
INSERT INTO `todo` VALUES (2,'Homework','F',1,2);
INSERT INTO `todo` VALUES (3,'Shopping','T',2,1);
INSERT INTO `todo` VALUES (4,'Shopping','F',2,2);
COMMIT;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `surname` VARCHAR(255) NOT NULL DEFAULT '',
  `first_name` VARCHAR(255) NOT NULL DEFAULT '',
  `email` VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES (1,'Kjatharn','Ragnar','rk@hyf.com');
INSERT INTO `user` VALUES (2,'Uthred','Jamie','ju@hyf.com');
COMMIT;


--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `tag` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` VALUES (1,'Essentials');
INSERT INTO `tag` VALUES (2,'Life');
INSERT INTO `tag` VALUES (3,'Health');
COMMIT;