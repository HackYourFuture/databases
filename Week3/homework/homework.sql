-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Departement`
--

DROP TABLE IF EXISTS `Departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Departement` (
  `Dept_Number` int(11) NOT NULL AUTO_INCREMENT,
  `Dept_Name` varchar(50) NOT NULL,
  `Dept_Location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Dept_Number`),
  UNIQUE KEY `Dept_Name` (`Dept_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departement`
--

LOCK TABLES `Departement` WRITE;
/*!40000 ALTER TABLE `Departement` DISABLE KEYS */;
/*!40000 ALTER TABLE `Departement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Emp_Info`
--

DROP TABLE IF EXISTS `Emp_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Emp_Info` (
  `Emp_Number` int(11) NOT NULL,
  `Emp_Phone` varchar(50) NOT NULL,
  `Emp_Email` varchar(50) NOT NULL,
  `Emp_Addres` varchar(50) NOT NULL,
  KEY `Emp_Number` (`Emp_Number`),
  CONSTRAINT `Emp_Info_ibfk_1` FOREIGN KEY (`Emp_Number`) REFERENCES `Employee` (`Emp_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Emp_Info`
--

LOCK TABLES `Emp_Info` WRITE;
/*!40000 ALTER TABLE `Emp_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Emp_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `Emp_Number` int(11) NOT NULL AUTO_INCREMENT,
  `Emp_Salary` double NOT NULL,
  `Emp_HiringDate` date NOT NULL,
  `Emp_Birth` date NOT NULL,
  `Dept_Number` int(11) NOT NULL,
  PRIMARY KEY (`Emp_Number`),
  KEY `Dept_Number` (`Dept_Number`),
  CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`Dept_Number`) REFERENCES `Departement` (`Dept_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee_Project`
--

DROP TABLE IF EXISTS `Employee_Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee_Project` (
  `Emp_Number` int(11) NOT NULL,
  `Project_Number` int(11) NOT NULL,
  PRIMARY KEY (`Emp_Number`,`Project_Number`),
  KEY `Project_Number` (`Project_Number`),
  CONSTRAINT `Employee_Project_ibfk_1` FOREIGN KEY (`Emp_Number`) REFERENCES `Employee` (`Emp_Number`),
  CONSTRAINT `Employee_Project_ibfk_2` FOREIGN KEY (`Project_Number`) REFERENCES `Project` (`Project_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee_Project`
--

LOCK TABLES `Employee_Project` WRITE;
/*!40000 ALTER TABLE `Employee_Project` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employee_Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project`
--

DROP TABLE IF EXISTS `Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Project` (
  `Project_Number` int(11) NOT NULL AUTO_INCREMENT,
  `Project_Name` varchar(50) NOT NULL,
  `Project_Location` varchar(50) NOT NULL,
  `Dept_Number` int(11) NOT NULL,
  PRIMARY KEY (`Project_Number`),
  UNIQUE KEY `Project_Name` (`Project_Name`),
  KEY `Dept_Number` (`Dept_Number`),
  CONSTRAINT `Project_ibfk_1` FOREIGN KEY (`Dept_Number`) REFERENCES `Departement` (`Dept_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project`
--

LOCK TABLES `Project` WRITE;
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-09  2:06:30
