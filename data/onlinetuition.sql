-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: onlinetuition
-- ------------------------------------------------------
-- Server version	5.6.22-log

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
-- Table structure for table `curriculums`
--

DROP TABLE IF EXISTS `curriculums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curriculums` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL,
  `educlevel` varchar(45) NOT NULL,
  `subids` varchar(128) NOT NULL,
  `totalunits` int(11) NOT NULL,
  `fee` double NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `sid` (`sid`),
  CONSTRAINT `curriculums_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `schools` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculums`
--

LOCK TABLES `curriculums` WRITE;
/*!40000 ALTER TABLE `curriculums` DISABLE KEYS */;
/*!40000 ALTER TABLE `curriculums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `studid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `schoolperiod` varchar(45) NOT NULL,
  `educlevel` varchar(45) NOT NULL,
  `subids` varchar(128) NOT NULL,
  `totalunits` int(11) NOT NULL,
  `fee` double NOT NULL,
  `pstatus` varchar(16) DEFAULT 'pending',
  `tids` varchar(45) DEFAULT NULL,
  `tidff` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `sid_idx` (`sid`),
  KEY `studid_idx` (`studid`),
  CONSTRAINT `sid` FOREIGN KEY (`sid`) REFERENCES `schools` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `studid` FOREIGN KEY (`studid`) REFERENCES `students` (`studid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,3,'2016-07-29 10:00:00','AY 2016-2017 Sem 1','undergraduate','14,15,16,17,18',15,49148.25,'pending',NULL,NULL),(2,2,3,'2016-08-01 11:26:00','AY 2016-2017 Sem 1','undergraduate','14,15,16,17,18',15,49148.25,'pending',NULL,NULL),(3,3,1,'2016-07-28 17:23:00','AY 2016-2017 Sem 1','undergraduate','1,2,3',9,13500,'pending',NULL,NULL),(4,4,2,'2016-08-02 16:34:00','AY 2016-2017 Sem 1','undergraduate','6,7,8,9,10',15,22500,'pending',NULL,NULL),(5,5,4,'2016-07-15 09:38:00','AY 2016-2017 Sem 1','undergraduate','19,20,21,22,23',14,33082,'pending',NULL,NULL),(6,6,4,'2016-07-16 10:45:00','AY 2016-2017 Sem 1','undergraduate','19,20,21,22,23',14,33082,'pending',NULL,NULL),(7,3,1,'2016-08-05 07:23:00','AY 2016-2017 Sem 1','undergraduate','4,5',6,9000,'pending',NULL,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schools` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `defaultpriceperunit` double DEFAULT NULL,
  `accountnum` varchar(45) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,'University of the Philippines - Diliman',1500,'1562485620'),(2,'University of the Philippines - Los Banos',1500,'1562485621'),(3,'Ateneo de Manila University',3276.55,'5462054862'),(4,'De La Salle University',2363,'8462156972');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `studid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `middlename` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) NOT NULL,
  `birthdate` date NOT NULL,
  PRIMARY KEY (`studid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,1,'Unang','Gitna','Estudyante','1994-05-01'),(2,1,'Ikalawa','Gitna','Estudyante','1990-02-01'),(3,2,'Isko','Ako','Firstpaaral','1988-07-27'),(4,2,'Iska','Ulit','Secondpaaral','1991-09-15'),(5,2,'Tres','Third','Scholar','1996-03-19'),(6,3,'Josue','Dela Pena','Comandante','2008-12-01');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `subid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) NOT NULL,
  `subname` varchar(45) NOT NULL,
  `subdesc` varchar(64) DEFAULT NULL,
  `units` int(11) NOT NULL,
  `priceperunit` double NOT NULL,
  PRIMARY KEY (`subid`),
  KEY `sid` (`sid`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `schools` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,1,'Math 11','College Algebra',3,1500),(2,1,'Math 14','Plane Trigonometry',3,1500),(3,1,'Eng 10','College English',3,1500),(4,1,'Anthro 10','Bodies, Senses and Humanity',3,1500),(5,1,'PE 2 WT','Weight Training',3,1500),(6,2,'Math 11','College Algebra',3,1500),(7,2,'Math 14','Plane Trigonometry',3,1500),(8,2,'Eng 10','College English',3,1500),(9,2,'Anthro 10','Bodies, Senses and Humanity',3,1500),(10,2,'PE 2 WT','Weight Training',3,1500),(14,3,'Acc 10','Principles of Acconting',3,3276.55),(15,3,'ITM 14','Information Technology Application Programming',3,3276.55),(16,3,'POM 102','Fundamentals of Production and Operations Management',3,3276.55),(17,3,'Fin 101','Fundamentals of Finance',3,3276.55),(18,3,'CS 123','Introduction to Software Engineering',3,3276.55),(19,4,'ENGPHY 1','Statics and Dynamics',3,2363),(20,4,'SCIMATP','Science of Materials',3,2363),(21,4,'BIOPHY 1','Physics for Biologists 1',3,2363),(22,4,'LBYENVP','Environmental Science Laboratory',3,2363),(23,4,'LBYPHY 1','Physics Laboratory 1',2,2363);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `middlename` varchar(32) DEFAULT NULL,
  `lastname` varchar(32) NOT NULL,
  `address` varchar(128) NOT NULL,
  `mobile` varchar(16) DEFAULT NULL,
  `landline` varchar(10) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `usertype` varchar(8) NOT NULL,
  `sid` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asdfjkl;','Tester','Crack','Coder','Antipolo City','09163677476','6963708','test@gmail.com','user',NULL),(2,'qwerty','Private','School','Owner','Quezon City','09914568725','9874568','school@gmail.com','school',1),(3,'poiuyt','Kaye','Dela Pena','Comandante','Fairview, Quezon City','09784567892','6968542','inmenou@gmail.com','admin',NULL);
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

-- Dump completed on 2016-08-27 22:34:19
