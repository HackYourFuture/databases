-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
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
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reminder` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,'bayram',1,NULL),(2,'adyen visit',1,'2019-08-14 13:00:00'),(3,'react',1,NULL),(4,'meeting',3,NULL),(5,'adyen visit',3,'2019-08-14 13:00:00'),(6,'hyf',4,NULL),(7,'vacation',4,NULL),(8,'shopping',7,'2019-08-14 13:00:00'),(9,'weekend',7,NULL),(10,'nodejs',3,'2012-10-05 12:05:00'),(11,'holiday',2,'2012-10-05 12:05:00'),(12,'hyf',12,'2012-10-05 12:05:00'),(13,'adyen',10,'2012-10-05 12:05:00'),(14,'carsamba',4,'2012-10-05 12:05:00'),(15,'sunday',13,'2012-10-05 12:05:00'),(16,'sunday',2,'2012-10-05 12:05:00');
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists_todos`
--

DROP TABLE IF EXISTS `lists_todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lists_todos` (
  `list_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `is_done` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`list_id`,`todo_id`),
  KEY `todo_id` (`todo_id`),
  CONSTRAINT `lists_todos_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`id`),
  CONSTRAINT `lists_todos_ibfk_2` FOREIGN KEY (`todo_id`) REFERENCES `todos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists_todos`
--

LOCK TABLES `lists_todos` WRITE;
/*!40000 ALTER TABLE `lists_todos` DISABLE KEYS */;
INSERT INTO `lists_todos` VALUES (1,1,0),(1,2,0),(1,3,0),(1,6,0),(2,1,0),(2,4,0),(2,5,0),(3,6,0),(3,7,0),(3,15,0),(4,8,0),(4,9,0),(5,10,0),(5,11,0),(5,13,0),(6,12,0),(6,13,0),(7,14,0),(7,15,0),(7,16,0),(8,17,0),(8,18,0),(9,19,0),(10,7,1),(10,15,1),(10,16,1),(11,20,0),(11,21,0),(12,22,0),(12,23,1),(13,24,0),(13,25,1),(14,26,0),(14,27,0),(15,23,0),(15,28,0),(15,29,0),(16,23,1),(16,30,0);
/*!40000 ALTER TABLE `lists_todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (4,'additional lessons'),(13,'book hotel'),(20,'buy a bag'),(28,'check homeworks'),(17,'cheese'),(2,'clothes for kids'),(10,'database schemas'),(25,'drink soup'),(23,'drink tea'),(27,'eat meat'),(21,'fina camera'),(8,'find a suit'),(6,'finish tutorial'),(18,'fishing rod'),(7,'get ready'),(16,'handsoap'),(15,'hire a photographer'),(30,'listen lesson'),(24,'prepare a question'),(9,'prepare question'),(3,'question'),(11,'read mdn'),(14,'rent a plane'),(26,'run 20 km'),(1,'set a car'),(29,'teach'),(22,'teach database'),(12,'video tutuorial'),(5,'watch video'),(19,'wind wear');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'abdullah'),(6,'alusine'),(16,'andrej'),(7,'ghufran'),(10,'hamza'),(11,'hani'),(14,'igor'),(5,'irfan'),(8,'nadin'),(3,'suheyb'),(4,'talip'),(12,'unmesh'),(13,'utku'),(1,'veli'),(15,'yagoup'),(9,'zehra');
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

-- Dump completed on 2019-08-15  5:59:54
