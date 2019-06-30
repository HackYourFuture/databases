-- MariaDB dump 10.17  Distrib 10.4.5-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: todo_app
-- ------------------------------------------------------
-- Server version	10.4.5-MariaDB-1:10.4.5+maria~bionic-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(35) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listItems`
--

DROP TABLE IF EXISTS `listItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listItems` (
  `item_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  PRIMARY KEY (`item_id`,`list_id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `listItems_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `todo_items` (`item_id`) ON UPDATE CASCADE,
  CONSTRAINT `listItems_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`list_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listItems`
--

LOCK TABLES `listItems` WRITE;
/*!40000 ALTER TABLE `listItems` DISABLE KEYS */;
INSERT INTO `listItems` VALUES (1,1);
/*!40000 ALTER TABLE `listItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_items`
--

DROP TABLE IF EXISTS `todo_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todo_items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(35) DEFAULT NULL,
  `tag` char(35) DEFAULT NULL,
  `description` char(200) DEFAULT NULL,
  `isComplete` char(3) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_items`
--

LOCK TABLES `todo_items` WRITE;
/*!40000 ALTER TABLE `todo_items` DISABLE KEYS */;
INSERT INTO `todo_items` VALUES (1,'buy groceries','home','no desc.','yes','2019-07-03'),(2,'do homeworks','school','db assignment','no','2019-07-05');
/*!40000 ALTER TABLE `todo_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_lists`
--

DROP TABLE IF EXISTS `todo_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todo_lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(35) DEFAULT NULL,
  `description` char(200) DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_lists`
--

LOCK TABLES `todo_lists` WRITE;
/*!40000 ALTER TABLE `todo_lists` DISABLE KEYS */;
INSERT INTO `todo_lists` VALUES (1,'list3','school-related todos'),(2,'list2','work-related todos'),(3,'list1','home-related todos');
/*!40000 ALTER TABLE `todo_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userList`
--

DROP TABLE IF EXISTS `userList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userList` (
  `user_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`list_id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `userList_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `userList_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`list_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userList`
--

LOCK TABLES `userList` WRITE;
/*!40000 ALTER TABLE `userList` DISABLE KEYS */;
INSERT INTO `userList` VALUES (1,1),(1,2),(2,1);
/*!40000 ALTER TABLE `userList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(52) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jack'),(2,'mike'),(3,'denise');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-30  9:01:08
