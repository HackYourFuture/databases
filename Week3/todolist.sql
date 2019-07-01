-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_list_app
-- ------------------------------------------------------
-- Server version	8.0.16


--
-- Current Database: `todo`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `todo_list_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `todo_list_app`;



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `todolists`
--

DROP TABLE IF EXISTS `todolists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todolists` (
  `todolistID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT '',
  PRIMARY KEY (`todolistID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolists`
--

LOCK TABLES `todolists` WRITE;
/*!40000 ALTER TABLE `todolists` DISABLE KEYS */;
INSERT INTO `todolists` VALUES (1,'shopping','weekly shopping'),(2,'european trip','I will this month travel to europe'),(3,'university','exam preparation'),(5,'newlist','newdescription'),(6,'anewlist','anewdescription'),(7,'anewlist','anewdescription'),(8,'aaanewlist','aaanewdescription'),(9,'bnewlist','bnewdescription'),(10,'cnewlist','cnewdescription'),(11,'dnewlist','dnewdescription'),(12,'dnewlist','dnewdescription'),(13,'dnewlist','dnewdescription'),(14,'dnewlist','dnewdescription'),(15,'dnewlist','dnewdescription'),(16,'dnewlist','dnewdescription'),(17,'dnewlist','dnewdescription'),(18,'dnewlist','dnewdescription'),(19,'dnewlist','dnewdescription'),(20,'dnewlist','dnewdescription'),(21,'dnewlist','dnewdescription'),(22,'dnewlist','dnewdescription'),(23,'dnewlist','dnewdescription'),(24,'dnewlist','dnewdescription'),(25,'dnewlist','dnewdescription'),(26,'dnewlist','dnewdescription'),(27,'dnewlist','dnewdescription'),(28,'dnewtodo','1'),(29,'dnewtodo','1'),(30,'dnewtodo','1'),(31,'dnewtodo','1'),(32,'dnewtodo','1');
/*!40000 ALTER TABLE `todolists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todolists_todos`
--

DROP TABLE IF EXISTS `todolists_todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todolists_todos` (
  `todolistID` int(11) NOT NULL,
  `todoID` int(11) NOT NULL,
  KEY `todolistID` (`todolistID`),
  KEY `todoID` (`todoID`),
  CONSTRAINT `todolists_todos_ibfk_1` FOREIGN KEY (`todolistID`) REFERENCES `todolists` (`todolistID`),
  CONSTRAINT `todolists_todos_ibfk_2` FOREIGN KEY (`todoID`) REFERENCES `todos` (`todoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todolists_todos`
--

LOCK TABLES `todolists_todos` WRITE;
/*!40000 ALTER TABLE `todolists_todos` DISABLE KEYS */;
INSERT INTO `todolists_todos` VALUES (1,1),(1,2),(2,1),(2,2),(2,3),(3,5),(1,6),(2,6),(3,6),(27,1),(27,2),(1,12),(2,12),(3,12),(1,13),(2,13),(3,13),(1,15),(2,15),(3,15),(1,16),(2,16),(3,16),(28,1),(28,2),(28,3),(29,1),(29,2),(29,3),(30,1),(30,2),(30,3),(31,1),(31,2),(31,3),(32,1),(32,2),(32,3);
/*!40000 ALTER TABLE `todolists_todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todos` (
  `todoID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isCompleted` enum('1','0') DEFAULT '0',
  `reminder` datetime DEFAULT NULL,
  PRIMARY KEY (`todoID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (1,'buy slippers','0','2015-01-01 00:00:00'),(2,'buy cheap slipperss','1','2015-01-01 00:00:00'),(3,'arrange routes','0','2019-02-01 00:00:00'),(5,'books','1','2019-01-01 00:00:00'),(6,'a','1','2019-09-09 00:00:00'),(7,'dnewtodo','1','2019-01-31 00:00:00'),(8,'dnewtodo','1','2019-01-31 00:00:00'),(9,'dnewtodo','1','2019-01-31 00:00:00'),(10,'dnewtodo','1','2019-01-31 00:00:00'),(11,'dnewtodo','1','2019-01-31 00:00:00'),(12,'dnewtodo','1','2019-01-31 00:00:00'),(13,'dnewtodo','1','2018-01-03 00:00:00'),(14,'dnewtodo','1','2018-01-03 00:00:00'),(15,'dnewtodo','1','2018-01-03 00:00:00'),(16,'dnewtodo','1','2018-01-03 00:00:00');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aleuna','aleyna@gmail.com'),(2,'burak','burak@gmail.com'),(3,'cemre','cemre@gmail.com'),(5,'dnewtodo','sds@gmail.com'),(6,'dnewtodo','sds@gmail.com'),(7,'dnewtodo','sds@gmail.com'),(8,'dnewtodo','sds@gmail.com'),(9,'dnewtodo','sds@gmail.com'),(10,'dnewtodo','sds@gmail.com'),(11,'dnewtodo','sds@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_todolists`
--

DROP TABLE IF EXISTS `users_todolists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_todolists` (
  `userID` int(11) NOT NULL,
  `todolistID` int(11) NOT NULL,
  KEY `userID` (`userID`),
  KEY `listID` (`todolistID`),
  CONSTRAINT `users_todolists_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `users_todolists_ibfk_2` FOREIGN KEY (`todolistID`) REFERENCES `todolists` (`todolistID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_todolists`
--

LOCK TABLES `users_todolists` WRITE;
/*!40000 ALTER TABLE `users_todolists` DISABLE KEYS */;
INSERT INTO `users_todolists` VALUES (1,1),(1,2),(2,3),(3,1),(3,2),(3,1),(1,27),(2,27),(3,27),(8,1),(8,2),(8,3),(9,1),(9,2),(9,3),(10,1),(10,2),(10,3),(11,1),(11,2),(11,3),(1,28),(2,28),(3,28),(1,29),(2,29),(3,29),(1,30),(2,30),(3,30),(1,31),(2,31),(3,31),(1,32),(2,32),(3,32);
/*!40000 ALTER TABLE `users_todolists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-01 11:41:49
