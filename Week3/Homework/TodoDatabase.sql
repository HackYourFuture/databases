-- MySQL dump 10.13  Distrib 8.0.17, for osx10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: TodoApplication
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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category`
(
  `category_id` int
(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar
(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY
(`category_id`),
  UNIQUE KEY `category_name`
(`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `
category`
VALUES
  (2, 'Chores'),
  (6, 'Family'),
  (4, 'Fun'),
  (5, 'Personal'),
  (3, 'Urgent'),
  (1, 'Work');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task`
(
  `task_id` int
(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar
(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT CURRENT_TIMESTAMP,
  `complete` enum
('T','F') COLLATE utf8mb4_general_ci DEFAULT 'F',
  `category_id` int
(11) DEFAULT NULL,
  `list_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`task_id`),
  KEY `category_id`
(`category_id`),
  KEY `list_id`
(`list_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY
(`category_id`) REFERENCES `category`
(`category_id`) ON
DELETE
SET NULL
,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY
(`list_id`) REFERENCES `task_list`
(`list_id`) ON
DELETE
SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `
task`
VALUES
  (1, 'Smile', '2019-10-07 16:04:37', '2019-10-08 16:04:37', 'T', NULL, NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_list`
--

DROP TABLE IF EXISTS `task_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_list`
(
  `list_id` int
(11) NOT NULL AUTO_INCREMENT,
  `list_name` varchar
(30) COLLATE utf8mb4_general_ci NOT NULL,
  `reminder_time` datetime DEFAULT NULL,
  `user_id` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`list_id`),
  KEY `user_id`
(`user_id`),
  CONSTRAINT `task_list_ibfk_1` FOREIGN KEY
(`user_id`) REFERENCES `user`
(`user_id`) ON
DELETE
SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_list`
--

LOCK TABLES `task_list` WRITE;
/*!40000 ALTER TABLE `task_list` DISABLE KEYS */;
INSERT INTO `
task_list`
VALUES
  (1, 'Workout List', '2019-10-21 10:00:00', 1),
  (2, 'Study List', '2020-10-21 15:00:00', NULL);
/*!40000 ALTER TABLE `task_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user`
(
  `user_id` int
(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar
(40) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar
(40) COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar
(8) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY
(`user_id`),
  UNIQUE KEY `user_name`
(`user_name`),
  UNIQUE KEY `user_email`
(`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user`
VALUES
  (1, 'Joe', 'Joe@gmail.com', 'udhj1253'),
  (2, 'Mary', 'mary@gmail.com', 'udhj1932');
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

-- Dump completed on 2019-10-07 16:08:34
