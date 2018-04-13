CREATE DATABASE  IF NOT EXISTS `manager` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `manager`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: manager
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.31-MariaDB

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
-- Table structure for table `alertsystem`
--

DROP TABLE IF EXISTS `alertsystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alertsystem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `message` text,
  `application_id` int(11) DEFAULT NULL,
  `object` text,
  `creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `application_alert_idx` (`application_id`),
  CONSTRAINT `application_alert` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alertsystem`
--

LOCK TABLES `alertsystem` WRITE;
/*!40000 ALTER TABLE `alertsystem` DISABLE KEYS */;
/*!40000 ALTER TABLE `alertsystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (1,'test','7040cb72e5b1a981b50cb2cb49469b51815cf82b');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `user_id` int(11) NOT NULL,
  `zone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_client_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clienttype`
--

DROP TABLE IF EXISTS `clienttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clienttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `porcentSale` float DEFAULT NULL,
  `porcentPackage` float DEFAULT NULL,
  `payoutMin` int(11) DEFAULT NULL,
  `ts` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienttype`
--

LOCK TABLES `clienttype` WRITE;
/*!40000 ALTER TABLE `clienttype` DISABLE KEYS */;
/*!40000 ALTER TABLE `clienttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentation`
--

DROP TABLE IF EXISTS `documentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(250) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `lasUpdate` datetime DEFAULT NULL,
  `creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_documentation_idx` (`user_id`),
  KEY `status_documentation_idx` (`status_id`),
  CONSTRAINT `status_documentation` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_documentation` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentation`
--

LOCK TABLES `documentation` WRITE;
/*!40000 ALTER TABLE `documentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `content` text,
  `creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdate` datetime DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `subtitle` varchar(200) DEFAULT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  `messageType_id` int(11) DEFAULT '1',
  `active` int(2) DEFAULT '1',
  `from` date DEFAULT NULL,
  `to` date DEFAULT NULL,
  `creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_message_idx` (`user_id`),
  KEY `message_type_idx` (`messageType_id`),
  CONSTRAINT `message_type` FOREIGN KEY (`messageType_id`) REFERENCES `messagetype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_message` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messagetype`
--

DROP TABLE IF EXISTS `messagetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messagetype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messagetype`
--

LOCK TABLES `messagetype` WRITE;
/*!40000 ALTER TABLE `messagetype` DISABLE KEYS */;
INSERT INTO `messagetype` VALUES (1,'Personal'),(2,'General');
/*!40000 ALTER TABLE `messagetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `optionsystem`
--

DROP TABLE IF EXISTS `optionsystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `optionsystem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `panel_id` int(11) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `lastUpdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `panel_optionsS_idx` (`panel_id`),
  CONSTRAINT `panel_optionsS` FOREIGN KEY (`panel_id`) REFERENCES `panel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `optionsystem`
--

LOCK TABLES `optionsystem` WRITE;
/*!40000 ALTER TABLE `optionsystem` DISABLE KEYS */;
/*!40000 ALTER TABLE `optionsystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panel`
--

DROP TABLE IF EXISTS `panel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `key` varchar(45) DEFAULT NULL,
  `active` int(2) NOT NULL DEFAULT '1',
  `value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panel`
--

LOCK TABLES `panel` WRITE;
/*!40000 ALTER TABLE `panel` DISABLE KEYS */;
INSERT INTO `panel` VALUES (1,'asd','asd',1,'xx-xxxxxxx-x'),(2,'Teléfono','phone',1,'');
/*!40000 ALTER TABLE `panel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Admin'),(2,'Proveedor'),(3,'Vendedor/Repartidor'),(4,'Repartidor'),(5,'Vendedor'),(6,'Cliente'),(7,'Deposito');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Activo'),(2,'Pendiente'),(3,'Cancelado');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `nickname` varchar(60) DEFAULT NULL,
  `surname` varchar(60) DEFAULT '',
  `email` varchar(60) DEFAULT NULL,
  `dni` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `state` varchar(60) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `address` varchar(60) DEFAULT NULL,
  `postalCode` varchar(10) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastConection` datetime DEFAULT NULL,
  `lastUpdate` datetime DEFAULT NULL,
  `active` int(2) NOT NULL DEFAULT '1',
  `status_id` int(11) DEFAULT '1',
  `rol_id` int(11) DEFAULT NULL,
  `clientType_id` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `status_user_idx` (`status_id`),
  KEY `fk_user_rol_id_idx` (`rol_id`),
  CONSTRAINT `fk_user_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `status_user` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10172 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dortha','Lea','Gislason','Elvis@dion.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:46:58',NULL,NULL,1,1,NULL,1),(2,'Bette','Gianni','O\'Conner','Ashton_Beatty@orion.tv',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:47:38',NULL,NULL,1,1,NULL,1),(4,'Ceasar','Isabell_Heidenreich','Reynolds','Syble_Hettinger@mireille.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:49:38',NULL,NULL,1,1,NULL,1),(5,'Curtis','Joan_Murray','Monahan','Wilber@graham.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(6,'Kieran','Neva_Tremblay','Maggio','Chesley_Runolfsdottir@mariana.name',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(7,'Nina','Rory.Heller','Schuppe','Nestor@genesis.co.uk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(8,'Janie','Angelina','Leannon','Alene@jasen.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(9,'Wallace','Sedrick','Heathcote','Myron.Kuhic@erling.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(10,'Bethany','Thora','Larson','Nikita@roxane.me',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(11,'Alfredo','Milan_Thompson','Towne','Audrey.Welch@betsy.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(12,'Maribel','Nicklaus_Huel','Schroeder','Michale_Torp@lee.ca',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(13,'Giovanni','Wava','Upton','Hugh.Rowe@kip.ca',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(14,'Karl','Georgette_VonRueden','Kovacek','Estefania@marquise.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(15,'Lavon','Tia_Gaylord','Kessler','Marcella@darius.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(16,'Reanna','Dashawn','Watsica','Tristian@lenny.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(17,'Verner','Ila','Weissnat','George_Fisher@liana.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(18,'Zoe','Letitia.Harvey','Kuhic','Hal_Robel@althea.io',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(19,'Ed','Jett','Weber','Cecelia.Mohr@daren.name',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(20,'Skylar','Justen.Mann','Schoen','Devante@melody.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:51:36',NULL,NULL,1,1,NULL,1),(10128,'Serita','ElSerafio','CodiguitoRoto','eltrapome_espera@enlaesquina.kb','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 12:45:45',NULL,NULL,1,1,NULL,1),(10129,'Rupert','Estell_Kris','Collins','Sven_Howell@demarcus.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-04 13:46:33',NULL,NULL,1,1,NULL,1),(10144,'pedro','','perez','perez@pedro.os','','',0,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 15:04:39',NULL,NULL,1,1,1,1),(10145,'Juan','Cosmoloco','Perez','jperez@roll.co','123556','',0,NULL,'Buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 17:46:00',NULL,NULL,1,1,1,1),(10146,'Lucas','tvt.peel','Lore','lu.cas@tc.eu','12357884','',2,NULL,'rio negro','una de rio negro','alguna','78787','255558877','2018-04-05 17:55:20',NULL,NULL,1,1,1,1),(10148,'Ojala','Noper','Turunen','lk.@as.c','1235677999','',6,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:17:11',NULL,NULL,1,1,1,1),(10149,'Calo','CaRi','Ribero','lo@pu.ta','668987987','',6,NULL,'aaa','aaa','11saa','44','444444444','2018-04-05 18:35:09',NULL,NULL,1,1,1,1),(10150,'Colo','esToure','Ture','Toure@meconfundi.co','1235667','',9,NULL,'pepe','pepe','pepe','1221','9898875654','2018-04-05 18:36:20',NULL,NULL,1,1,1,1),(10151,'YAYA','ToureYaya','Tourele','hermano@toure.c','893769','',1,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:38:40',NULL,NULL,1,1,1,1),(10152,'theLast','elultimo','teen','q@q.c','759459','',2,NULL,'','','','','','2018-04-05 18:39:30',NULL,NULL,1,1,1,1),(10153,'nuevo','newArr','array','w@w.c','666666666','',4,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:40:20',NULL,NULL,1,1,1,1),(10155,'uu66u6u','u6u6u','6u6u','u6@11.c','414123231231231','',2,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:44:22',NULL,NULL,1,1,1,1),(10156,'juansito','endirecto','lo vemos','qwe@dddd.c','1313131313315','',1,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:46:11',NULL,NULL,1,1,1,1),(10157,'corlocococo','ldasw','lasasas','r@r.c','5588585','',6,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:47:39',NULL,NULL,1,1,1,1),(10158,'pelotudeo','qqq231','team','ewe@qwf.c','111558888888','',1,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:50:18',NULL,NULL,1,1,1,1),(10159,'con','probamos','elbind','todos@s.c','1155511551','',7,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 18:52:22',NULL,NULL,1,1,1,1),(10160,'thomas','nomeimportanada','tompson','5@c.p','5165651','',1,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 19:01:37',NULL,NULL,1,1,1,1),(10161,'el7','magica','7','7q@7q.c','567887642','',1,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 19:22:39',NULL,NULL,1,1,1,1),(10162,'8','8','8','8@8','11188888888','',8,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 19:24:34',NULL,NULL,1,1,1,1),(10163,'9','9','9','9','999999999999999','',9,NULL,'','','','','','2018-04-05 19:26:42',NULL,NULL,1,1,1,1),(10164,'10','1010','10','10','10101010100','',10,NULL,'','','','','','2018-04-05 19:27:02',NULL,NULL,1,1,1,1),(10166,'11','111','111','111','1111','',11,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 19:30:53',NULL,NULL,1,1,1,1),(10167,'ppoqwopqwepo','qwepoqewo','qwpoqewpoqew','q@w.c','5611561561','',2,NULL,'buenos aires','Mar del plata','28 de septiembre','7600','123456789','2018-04-05 21:43:55',NULL,NULL,1,1,1,1),(10168,'asdasdsdaasdads','asdsdasdasad','asdasdsaddassdasda','dassadasdsadasd','12312123312','',5,NULL,'asdsdaasddas','sdsaasdasd','dasdasads','566666','666666','2018-04-09 12:23:29',NULL,NULL,1,1,1,1),(10169,'lea','Test','b','email@email.com',NULL,'86f7e437faa5a7fce15d1ddcb9eaeaea377667b8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-09 14:09:04',NULL,NULL,1,1,NULL,1),(10170,'asdds','asdsdadassadsda','asadssadsda','asdasdasdasdsaasd','123123231231','',7,NULL,'dsaasdsda','dfgfggsd','fsddfsdfsdfs','12321123','989898989','2018-04-10 12:54:25',NULL,NULL,1,1,1,1),(10171,'pruebis','aasddsadasd','aaa','qweqew@eeeeeee.c','12321233121212','',4,NULL,'asdsdasda','5sdffsddfs','dsfdffgd','684','8644868484','2018-04-12 17:07:06',NULL,NULL,1,1,1,1);
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

-- Dump completed on 2018-04-13 17:02:01
