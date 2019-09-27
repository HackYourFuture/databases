-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `list_item_completion`
--

DROP TABLE IF EXISTS `list_item_completion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_item_completion` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `List_ID` int(3) NOT NULL,
  `Item_ID` int(3) NOT NULL,
  `Situation` enum('Finished','Not Finished') NOT NULL DEFAULT 'Not Finished',
  PRIMARY KEY (`ID`),
  KEY `list_item_completion_ibfk_1` (`List_ID`),
  KEY `list_item_completion_ibfk_2` (`Item_ID`),
  CONSTRAINT `list_item_completion_ibfk_1` FOREIGN KEY (`List_ID`) REFERENCES `todo_list` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `list_item_completion_ibfk_2` FOREIGN KEY (`Item_ID`) REFERENCES `todo_item` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_item_completion`
--

LOCK TABLES `list_item_completion` WRITE;
/*!40000 ALTER TABLE `list_item_completion` DISABLE KEYS */;
INSERT INTO `list_item_completion` VALUES (11,47,45,'Finished'),(12,48,46,'Finished'),(13,49,42,'Finished'),(14,50,42,'Finished'),(15,51,49,'Not Finished'),(16,52,48,'Not Finished'),(17,54,47,'Not Finished'),(18,55,50,'Not Finished'),(19,56,44,'Not Finished'),(20,59,40,'Not Finished'),(21,60,41,'Not Finished');
/*!40000 ALTER TABLE `list_item_completion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminder` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `DATE` timestamp NOT NULL,
  `Notification` char(80) DEFAULT 'Due Date!!!',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminder`
--

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
INSERT INTO `reminder` VALUES (29,'2019-09-01 07:00:00','Due Date!!!'),(30,'2019-10-01 07:00:00','Due Date!!!'),(31,'2019-11-01 08:00:00','Due Date!!!'),(32,'2019-12-01 08:00:00','Due Date!!!'),(33,'2020-01-01 08:00:00','Due Date!!!'),(34,'2020-02-01 08:00:00','Due Date!!!'),(35,'2020-03-01 08:00:00','Due Date!!!'),(36,'2020-04-01 07:00:00','Due Date!!!'),(37,'2020-05-01 07:00:00','Due Date!!!'),(38,'2020-06-01 07:00:00','Due Date!!!');
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_item`
--

DROP TABLE IF EXISTS `todo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_item` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_item`
--

LOCK TABLES `todo_item` WRITE;
/*!40000 ALTER TABLE `todo_item` DISABLE KEYS */;
INSERT INTO `todo_item` VALUES (39,'go cinema'),(40,'ride a horse'),(41,'cycling'),(42,'cleaning house'),(43,'painting house'),(44,'sunday brunch at home'),(45,'washing dishes'),(46,'preparing dinner'),(47,'appoinment with boss'),(48,'appoinment new customer'),(49,'appoinment new colegueas'),(50,'going daughters school'),(51,'visit grandpas'),(52,'Ali');
/*!40000 ALTER TABLE `todo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_list`
--

DROP TABLE IF EXISTS `todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_list` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `USER_ID` int(3) NOT NULL,
  `REMINDER_ID` int(3) NOT NULL,
  `Tag` enum('Household','Work','Hobby','Family') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `todo_list_ibfk_1` (`USER_ID`),
  KEY `todo_list_ibfk_2` (`REMINDER_ID`),
  CONSTRAINT `todo_list_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `todo_list_ibfk_2` FOREIGN KEY (`REMINDER_ID`) REFERENCES `reminder` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list`
--

LOCK TABLES `todo_list` WRITE;
/*!40000 ALTER TABLE `todo_list` DISABLE KEYS */;
INSERT INTO `todo_list` VALUES (47,'List-1',13,32,'Household'),(48,'List-1',14,30,'Household'),(49,'List-1',15,31,'Household'),(50,'List-2',15,31,'Household'),(51,'List-3',14,30,'Work'),(52,'List-3',15,35,'Work'),(54,'List-4',16,36,'Work'),(55,'List-4',17,37,'Family'),(56,'List-4',18,38,'Family'),(58,'List-4',19,38,'Family'),(59,'List-4',19,38,'Hobby'),(60,'List-4',18,37,'Hobby'),(62,'List-20',15,29,'Household');
/*!40000 ALTER TABLE `todo_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (13,'Mike'),(14,'Mustafa'),(15,'Micheal'),(16,'josef'),(17,'Rafael'),(18,'Unmesh'),(19,'Aysegul'),(20,'Koos'),(21,'jaap'),(22,'Obama'),(23,'Ali');
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

-- Dump completed on 2019-09-27 11:27:45
