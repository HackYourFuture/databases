-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.19.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 
*/;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `todo`
--

/*!40000 DROP DATABASE IF EXISTS `todo`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `todo` /*!40100 DEFAULT CHARACTER SET u
tf8 */;

USE `todo`;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `listname` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL,
  `reminderid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_fk_idx` (`userid`),
  KEY `reminder_id_idx` (`reminderid`),
  CONSTRAINT `reminder_fk` FOREIGN KEY (`reminderid`) REFERENCES `reminder` (`id
`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_fk` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE
 CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (5,'List of John Brown',17,NULL),(6,'List of John Brow
n',17,NULL),(7,'List of John Brown',17,NULL),(8,'List of John Brown',17,NULL),(9
,'List of John Brown',17,2),(10,'List of John Brown',17,3),(11,'List of John Bro
wn',17,4),(12,'List of John Brown',17,5),(13,'List of John Brown',17,6),(14,'Lis
t of John Brown',17,7),(15,'List of John Brown 2',17,NULL),(16,'List of John Bro
wn 2',17,8),(17,'List of John Brown 2',17,9),(18,'List of John Brown 2',17,10),(
19,'List of John Brown 2',17,11),(20,'List of John Brown 2',17,12),(21,'List of 
John Brown 2',17,13),(23,'Travel',22,14),(24,'Shopping',22,15);
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reminder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alert` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
INSERT INTO `reminder` VALUES (1,'2019-09-22 00:00:00'),(2,'2019-12-01 00:00:00'
),(3,'2019-12-01 00:00:00'),(4,'2019-12-01 00:00:00'),(5,'2019-12-01 00:00:00'),
(6,'2019-12-01 00:00:00'),(7,'2019-12-01 00:00:00'),(8,'2019-12-31 00:00:00'),(9
,'2019-12-31 00:00:00'),(10,'2019-12-31 00:00:00'),(11,'2019-12-31 00:00:00'),(1
2,'2019-12-31 00:00:00'),(13,'2019-12-31 00:00:00'),(14,'2019-09-25 15:00:00'),(
15,'2019-09-24 14:00:00');
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tagname_UNIQUE` (`tagname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (4,'food'),(6,'fresh'),(5,'outside'),(1,'tag1'),(2,'tag
2'),(3,'tag3');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todoitem`
--

DROP TABLE IF EXISTS `todoitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todoitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` text NOT NULL,
  `listid` int(11) NOT NULL,
  `done` enum('T','F') NOT NULL DEFAULT 'F',
  PRIMARY KEY (`id`),
  KEY `list_fk_idx` (`listid`),
  CONSTRAINT `list_fk` FOREIGN KEY (`listid`) REFERENCES `list` (`id`) ON DELETE
 CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todoitem`
--

LOCK TABLES `todoitem` WRITE;
/*!40000 ALTER TABLE `todoitem` DISABLE KEYS */;
INSERT INTO `todoitem` VALUES (1,'task with tag',5,'F'),(2,'task with tag 2',5,'
F'),(3,'task with tag 3',5,'F'),(4,'task with tag 4',5,'F'),(5,'task with tag 5'
,5,'F'),(6,'task with tag 6',5,'F'),(7,'task with tag 7',5,'F'),(8,'task with ta
g 7',5,'F'),(9,'task with tag 10',5,'F'),(10,'task with tag 11',5,'F'),(11,'picn
ic',21,'F'),(12,'Buy milk',24,'F'),(14,'Buy rice',24,'F'),(15,'Buy egg',24,'F'),
(16,'Buy fish',24,'F');
/*!40000 ALTER TABLE `todoitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todotag`
--

DROP TABLE IF EXISTS `todotag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todotag` (
  `todoitemid` int(11) NOT NULL,
  `tagid` int(11) NOT NULL,
  PRIMARY KEY (`todoitemid`,`tagid`),
  KEY `todo_fk_idx` (`todoitemid`),
  KEY `tag_id_idx` (`tagid`),
  CONSTRAINT `tag_id` FOREIGN KEY (`tagid`) REFERENCES `tag` (`id`) ON DELETE NO
 ACTION ON UPDATE NO ACTION,
  CONSTRAINT `todo_fk` FOREIGN KEY (`todoitemid`) REFERENCES `todoitem` (`id`) O
N DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todotag`
--

LOCK TABLES `todotag` WRITE;
/*!40000 ALTER TABLE `todotag` DISABLE KEYS */;
INSERT INTO `todotag` VALUES (8,1),(8,2),(8,3),(9,1),(9,2),(9,3),(10,1),(10,2),(
10,3),(11,4),(11,5),(16,4),(16,6);
/*!40000 ALTER TABLE `todotag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (17,'John Brown','john@example.com'),(18,'Johny Brown'
,'johny@example.com'),(19,'John Doe','john@doe.com'),(22,'Dan','dan@email.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-23 21:11:17
