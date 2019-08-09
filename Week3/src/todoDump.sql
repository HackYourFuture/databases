-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: todo
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
-- Table structure for table `completed_todos`
--

DROP TABLE IF EXISTS `completed_todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completed_todos` (
  `list_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`list_id`,`item_id`),
  KEY `fk_item` (`item_id`),
  CONSTRAINT `completed_todos_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`list_id`) ON DELETE CASCADE,
  CONSTRAINT `completed_todos_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `todo_items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completed_todos`
--

LOCK TABLES `completed_todos` WRITE;
/*!40000 ALTER TABLE `completed_todos` DISABLE KEYS */;
INSERT INTO `completed_todos` VALUES (219,307);
/*!40000 ALTER TABLE `completed_todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_in_lists`
--

DROP TABLE IF EXISTS `items_in_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_in_lists` (
  `list_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`list_id`,`item_id`),
  KEY `fk_item` (`item_id`),
  CONSTRAINT `items_in_lists_ibfk_3` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`list_id`) ON DELETE CASCADE,
  CONSTRAINT `items_in_lists_ibfk_4` FOREIGN KEY (`item_id`) REFERENCES `todo_items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_in_lists`
--

LOCK TABLES `items_in_lists` WRITE;
/*!40000 ALTER TABLE `items_in_lists` DISABLE KEYS */;
INSERT INTO `items_in_lists` VALUES (219,307),(218,308),(218,309),(219,311),(219,312);
/*!40000 ALTER TABLE `items_in_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reminder` varchar(100) DEFAULT NULL,
  `remind_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES (401,'the time has come!','2022-01-02 00:00:00'),(405,'Deadline!','2019-07-09 00:00:00');
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_items`
--

DROP TABLE IF EXISTS `todo_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_text` varchar(100) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=313 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_items`
--

LOCK TABLES `todo_items` WRITE;
/*!40000 ALTER TABLE `todo_items` DISABLE KEYS */;
INSERT INTO `todo_items` VALUES (304,'Buy bread'),(305,'Do the dishes'),(306,'Do laundry'),(307,'Study databases'),(308,'Buy flight ticket'),(309,'Buy trein ticket'),(310,'Call Paul'),(311,'Submit homework'),(312,'Check for feedback');
/*!40000 ALTER TABLE `todo_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_lists`
--

DROP TABLE IF EXISTS `todo_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `done` enum('T','F') NOT NULL DEFAULT 'F',
  `reminder` int(11) DEFAULT NULL,
  PRIMARY KEY (`list_id`),
  KEY `fk_reminder` (`reminder`),
  CONSTRAINT `todo_lists_ibfk_1` FOREIGN KEY (`reminder`) REFERENCES `reminders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_lists`
--

LOCK TABLES `todo_lists` WRITE;
/*!40000 ALTER TABLE `todo_lists` DISABLE KEYS */;
INSERT INTO `todo_lists` VALUES (204,'weekend','what to do at weekend','2019-08-05 00:00:00','T',401),(218,'Shopping for vacation','Buy list for vacation','2019-09-07 00:00:00','F',NULL),(219,'HackYourFuture','Todos about HackYourFuture','2019-07-09 00:00:00','F',405);
/*!40000 ALTER TABLE `todo_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_lists`
--

DROP TABLE IF EXISTS `user_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_lists` (
  `user_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  KEY `fk_user` (`user_id`),
  KEY `fk_list` (`list_id`),
  CONSTRAINT `user_lists_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_lists_ibfk_4` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`list_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_lists`
--

LOCK TABLES `user_lists` WRITE;
/*!40000 ALTER TABLE `user_lists` DISABLE KEYS */;
INSERT INTO `user_lists` VALUES (102,219);
/*!40000 ALTER TABLE `user_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (102,'Suheyb','M'),(111,'Alex','F');
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

-- Dump completed on 2019-08-09 10:33:50
