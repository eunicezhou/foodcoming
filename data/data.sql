-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: foodcoming
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `delever_id` int DEFAULT NULL,
  `record_id` int DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `merchant_id` (`merchant_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'member1','member1@gmail.com','scrypt:32768:8:1$upSChadwbATsN83R$1dbe68e35a20f6e4490eae8bedc8ad146601bf4363f04a5f5952073009558ef1d1da44e90e39ea9982fe0b8ee36be6a986a1552a63b5b289aacf2f35c9a20518',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `merchant_id` int DEFAULT NULL,
  `dishcategory` varchar(255) DEFAULT NULL,
  `dishname` varchar(255) DEFAULT NULL,
  `dishdescribe` text,
  `dishpicture` text,
  `price` int DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  KEY `merchant_id` (`merchant_id`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'蛋餅','原味蛋餅','可蛋奶素','https://dgz2b3tzb57hl.cloudfront.net/ca3277f3-3359-4014-acfb-d86bc079c1c0.jpeg',30,'05:00:00','13:00:00'),(1,'蛋餅','泡菜蛋餅','使用正統韓式泡菜','https://dgz2b3tzb57hl.cloudfront.net/28f0c9b7-255c-4b2a-a8da-b9693bb8533b.jpeg',40,'05:00:00','13:00:00'),(1,'蛋餅','玉米蛋餅','包覆滿滿金黃玉米','https://dgz2b3tzb57hl.cloudfront.net/f378ddf6-2d35-4e10-8822-866c696dca47.jpeg',40,'05:00:00','13:00:00'),(1,'三明治','總匯三明治','食材包含生菜、肉片、蛋，讓您每 口都營養均衡','https://dgz2b3tzb57hl.cloudfront.net/9c098a10-9288-43b0-a860-48ad8a6246dd.jpeg',50,'05:00:00','13:00:00'),(1,'飲料','豆漿','使用非基改黃豆，當天研磨熬煮而成','https://dgz2b3tzb57hl.cloudfront.net/9cd28879-623e-4309-a049-2e5e3732d62c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','紅茶','採用正統阿薩姆茶葉，平價享受奢華茶香','https://dgz2b3tzb57hl.cloudfront.net/79583bf8-9a7e-44cf-8844-3661da15eb7c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','奶茶','採用高牧鮮乳，完美平衡奶香與茶香','https://dgz2b3tzb57hl.cloudfront.net/da2592a6-feb0-471d-ba00-e1552599f4da.jpeg',40,'05:00:00','13:00:00');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchant`
--

DROP TABLE IF EXISTS `merchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchant` (
  `merchant_id` int NOT NULL AUTO_INCREMENT,
  `hostname` varchar(100) NOT NULL,
  `hostemail` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `shopname` varchar(255) NOT NULL,
  `photo` text,
  `shopaddress` varchar(255) NOT NULL,
  `lat` varchar(50) DEFAULT NULL,
  `lng` varchar(50) DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `holiday` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`merchant_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `shop_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` VALUES (1,'firstOne','member1@gmail.com','0911222111','一號早餐店','https://dgz2b3tzb57hl.cloudfront.net/8e497b16-2e05-4618-a7f1-d73c59d4f8d0.jpeg','台南市永康區台南市永康區新興街34巷80弄80號','23.0097016','120.2297274','05:00:00','13:00:00','星期一',7);
/*!40000 ALTER TABLE `merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_category`
--

DROP TABLE IF EXISTS `shop_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `category_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_category`
--

LOCK TABLES `shop_category` WRITE;
/*!40000 ALTER TABLE `shop_category` DISABLE KEYS */;
INSERT INTO `shop_category` VALUES (1,'主食','../static/image/shop_category/spaghetti.png'),(2,'燒烤/小吃','../static/image/shop_category/BBQ.png'),(3,'素食','../static/image/shop_category/vegan.png'),(4,'飲品','../static/image/shop_category/bubble_tea.png'),(5,'冰品/甜點','../static/image/shop_category/desert.png'),(6,'健康餐盒','../static/image/shop_category/healthy_food.png'),(7,'早餐','../static/image/shop_category/breakfast.png'),(8,'麵包','../static/image/shop_category/bread.png'),(9,'生鮮雜貨','../static/image/shop_category/grocery.png'),(10,'咖啡廳','../static/image/shop_category/coffee.png');
/*!40000 ALTER TABLE `shop_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-20 18:33:27
