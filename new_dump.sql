-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: userdb
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `Japanese`
--

DROP TABLE IF EXISTS `Japanese`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Japanese` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `ingredients` text,
  `steps` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Japanese`
--

LOCK TABLES `Japanese` WRITE;
/*!40000 ALTER TABLE `Japanese` DISABLE KEYS */;
INSERT INTO `Japanese` VALUES (1,'Sushi','Main Course','Rice, Seaweed, Fish','1. Prepare rice. 2. Slice fish. 3. Roll ingredients in seaweed.'),(2,'Ramen','Main Course','Noodles, Broth, Pork, Eggs, Green Onions','1. Boil noodles. 2. Prepare broth. 3. Add pork and eggs. 4. Garnish with green onions.'),(3,'Tempura','Appetizer','Shrimp, Flour, Egg, Oil','1. Mix flour and egg. 2. Dip shrimp. 3. Fry in oil.'),(4,'Teriyaki Chicken','Main Course','Chicken, Soy Sauce, Mirin, Sugar, Sake','1. Marinate chicken in soy sauce, mirin, sugar, and sake. 2. Cook chicken in a pan. 3. Reduce marinade to create teriyaki sauce. 4. Serve chicken with sauce.');
/*!40000 ALTER TABLE `Japanese` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cake`
--

DROP TABLE IF EXISTS `cake`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cake` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ingredients` text,
  `steps` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake`
--

LOCK TABLES `cake` WRITE;
/*!40000 ALTER TABLE `cake` DISABLE KEYS */;
INSERT INTO `cake` VALUES (1,'Chocolate Cake','Flour, Sugar, Cocoa Powder, Eggs, Milk, Butter','1. Preheat oven. 2. Mix dry ingredients. 3. Add wet ingredients. 4. Bake in oven.'),(2,'Vanilla Cake','Flour, Sugar, Eggs, Milk, Butter, Vanilla Extract','1. Preheat oven. 2. Mix dry ingredients. 3. Add wet ingredients. 4. Bake in oven.'),(3,'Carrot Cake','Flour, Sugar, Eggs, Carrots, Oil, Baking Powder','1. Preheat oven. 2. Mix dry ingredients. 3. Add grated carrots and wet ingredients. 4. Bake in oven.');
/*!40000 ALTER TABLE `cake` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vegetarian`
--

DROP TABLE IF EXISTS `vegetarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vegetarian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ingredients` text,
  `steps` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vegetarian`
--

LOCK TABLES `vegetarian` WRITE;
/*!40000 ALTER TABLE `vegetarian` DISABLE KEYS */;
INSERT INTO `vegetarian` VALUES (1,'Vegetarian Stir Fry','Broccoli, Bell Peppers, Carrots, Soy Sauce, Olive Oil, Garlic, Ginger','1. Heat oil in a pan. 2. Add garlic and ginger. 3. Add vegetables and stir fry. 4. Add soy sauce and cook until vegetables are tender.'),(2,'Veggie Burger','Black Beans, Bread Crumbs, Onion, Garlic, Olive Oil, Spices, Burger Buns','1. Mash black beans. 2. Mix with bread crumbs, onion, garlic, and spices. 3. Form patties. 4. Cook patties in oil until crispy. 5. Serve on burger buns.'),(3,'Quinoa Salad','Quinoa, Cherry Tomatoes, Cucumber, Red Onion, Feta Cheese, Olive Oil, Lemon Juice, Salt, Pepper','1. Cook quinoa. 2. Chop vegetables. 3. Mix quinoa with vegetables, feta, olive oil, and lemon juice. 4. Season with salt and pepper.');
/*!40000 ALTER TABLE `vegetarian` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-03 11:37:04
