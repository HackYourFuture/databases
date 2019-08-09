-- MySQL dump 10.13  Distrib 8.0.16, for osx10.13 (x86_64)
--
-- Host: localhost    Database: todoapp
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client
= utf8mb4 ;
CREATE TABLE `Item`
(
  `itemId` int
(11) NOT NULL AUTO_INCREMENT,
  `ToDoListId` int
(11) NOT NULL,
  `description` varchar
(100) NOT NULL,
  `isCompleted` enum
('T','F') NOT NULL DEFAULT 'F',
  PRIMARY KEY
(`itemId`),
  KEY `ToDoListId`
(`ToDoListId`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY
(`ToDoListId`) REFERENCES `todolist`
(`ToDoListId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client
= utf8mb4 ;
CREATE TABLE `reminder`
(
  `reminderId` int
(11) NOT NULL AUTO_INCREMENT,
  `ToDoListId` int
(11) NOT NULL,
  `reminder` datetime DEFAULT NULL,
  PRIMARY KEY
(`reminderId`),
  KEY `ToDoListId`
(`ToDoListId`),
  CONSTRAINT `reminder_ibfk_1` FOREIGN KEY
(`ToDoListId`) REFERENCES `todolist`
(`ToDoListId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ToDoList`
--

DROP TABLE IF EXISTS `ToDoList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client
= utf8mb4 ;
CREATE TABLE `ToDoList`
(
  `ToDoListId` int
(11) NOT NULL AUTO_INCREMENT,
  `userId` int
(11) NOT NULL,
  `ListName` varchar
(50) DEFAULT NULL,
  PRIMARY KEY
(`ToDoListId`),
  KEY `userId`
(`userId`),
  CONSTRAINT `todolist_ibfk_1` FOREIGN KEY
(`userId`) REFERENCES `users`
(`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ToDoList`
--

LOCK TABLES `ToDoList` WRITE;
/*!40000 ALTER TABLE `ToDoList` DISABLE KEYS */;
/*!40000 ALTER TABLE `ToDoList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client
= utf8mb4 ;
CREATE TABLE `users`
(
  `userId` int
(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar
(50) DEFAULT NULL,
  PRIMARY KEY
(`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `
users`
VALUES
  (1, 'nadin');
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

-- Dump completed on 2019-08-09 17:12:34
