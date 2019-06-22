-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- -----------------------------------------------------
-- Schema ToDo_App
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ToDo_App` ;

-- -----------------------------------------------------
-- Schema ToDo_App
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ToDo_App` DEFAULT CHARACTER SET utf8 ;
USE `ToDo_App` ;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`cid`),
  UNIQUE KEY `name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (4,'Friends'),(1,'Home'),(3,'Travel'),(2,'Work');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_item`
--

DROP TABLE IF EXISTS `todo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_item` (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL DEFAULT ' ',
  `isTagged` tinyint(4) NOT NULL DEFAULT '0',
  `Description` longtext,
  PRIMARY KEY (`iid`),
  UNIQUE KEY `item_name_UNIQUE` (`item_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_item`
--

LOCK TABLES `todo_item` WRITE;
/*!40000 ALTER TABLE `todo_item` DISABLE KEYS */;
INSERT INTO `todo_item` VALUES (1,'Dishwashing liquid',1,'a liquid to wash the dishes'),(2,'Read the book of friends',1,'a long story book'),(3,'tidy the living room',1,'a liquid to wash the dishes'),(4,'tomatoes',0,''),(5,'grapes',0,''),(6,'report',0,''),(7,'present',0,'');
/*!40000 ALTER TABLE `todo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_list`
--

DROP TABLE IF EXISTS `todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_list` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` varchar(255) NOT NULL DEFAULT ' ',
  `Category_cid` int(11) NOT NULL,
  PRIMARY KEY (`lid`,`Category_cid`),
  UNIQUE KEY `list_name_UNIQUE` (`list_name`),
  KEY `fk_ToDo_list_Category1_idx` (`Category_cid`),
  CONSTRAINT `fk_ToDo_list_Category1` FOREIGN KEY (`Category_cid`) REFERENCES `category` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list`
--

LOCK TABLES `todo_list` WRITE;
/*!40000 ALTER TABLE `todo_list` DISABLE KEYS */;
INSERT INTO `todo_list` VALUES (1,'Cleaning and washing',1),(3,'Meeting John',4),(5,'Reading',1),(4,'Shopping',1),(2,'Tidying',1),(6,'Writing',2);
/*!40000 ALTER TABLE `todo_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_list_item`
--

DROP TABLE IF EXISTS `todo_list_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todo_list_item` (
  `ToDo_list_lid` int(11) NOT NULL,
  `ToDo_item_iid` int(11) NOT NULL,
  `isCompleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ToDo_list_lid`,`ToDo_item_iid`),
  KEY `fk_ToDo_list_item_ToDo_item1_idx` (`ToDo_item_iid`),
  CONSTRAINT `fk_ToDo_list_item_ToDo_item1` FOREIGN KEY (`ToDo_item_iid`) REFERENCES `todo_item` (`iid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ToDo_list_item_ToDo_list1` FOREIGN KEY (`ToDo_list_lid`) REFERENCES `todo_list` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list_item`
--

LOCK TABLES `todo_list_item` WRITE;
/*!40000 ALTER TABLE `todo_list_item` DISABLE KEYS */;
INSERT INTO `todo_list_item` VALUES (1,1,1),(3,3,0),(6,7,1),(7,4,0),(7,5,1),(8,2,0),(9,6,0);
/*!40000 ALTER TABLE `todo_list_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL DEFAULT ' ',
  `last_name` varchar(255) NOT NULL DEFAULT ' ',
  `email` varchar(255) NOT NULL DEFAULT ' ',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `first_name_UNIQUE` (`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ali','Hasan','ali.hasam@hhmail.nl'),(2,'Jan','Boersma','jboersma@llhmail.com'),(3,'Richard','Jansen','jansen@hhmail.eu'),(4,'Lili','Maro','lili@uhmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_todo_list`
--

DROP TABLE IF EXISTS `user_todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_todo_list` (
  `User_uid` int(11) NOT NULL,
  `ToDo_list_lid` int(11) NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `Reminder` datetime DEFAULT NULL,
  PRIMARY KEY (`User_uid`,`ToDo_list_lid`),
  KEY `fk_user_todo_list_ToDo_list1_idx` (`ToDo_list_lid`),
  CONSTRAINT `fk_user_todo_list_ToDo_list1` FOREIGN KEY (`ToDo_list_lid`) REFERENCES `todo_list` (`lid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_todo_list_User` FOREIGN KEY (`User_uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_todo_list`
--

LOCK TABLES `user_todo_list` WRITE;
/*!40000 ALTER TABLE `user_todo_list` DISABLE KEYS */;
INSERT INTO `user_todo_list` VALUES (1,1,'2019-06-25 00:00:00','2019-06-23 00:00:00'),(2,3,'2019-06-26 00:00:00','2019-06-24 00:00:00'),(2,8,'2019-06-28 00:00:00','2019-06-26 00:00:00'),(3,6,'2019-06-25 00:00:00','2019-06-23 00:00:00'),(4,7,'2019-06-27 00:00:00','2019-06-25 00:00:00'),(4,9,'2019-06-25 00:00:00',NULL);
/*!40000 ALTER TABLE `user_todo_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'todo_app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-22 23:51:20
