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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'member1','member1@gmail.com','sha256$m7N3OMpXlxB2X3CT$914be422961af6704ddf104bedd8d96aa3a429e95e211fd593b37d73e755fdf6',1,NULL,NULL,NULL),(2,'member2','member2@gmail.com','sha256$EDgdeWLAY2fpeqwS$f18a94e93e2a9b7720beb3ca4ab9ed8ef38c756f6997178e1021607f6b5e2278',2,NULL,NULL,NULL);
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
  `end` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'蛋餅','原味蛋餅','可蛋奶素','https://dgz2b3tzb57hl.cloudfront.net/84fe561d-2d70-487c-9687-c7546ce0abe9.jpeg',30,'06:00:00','12:30:00'),(1,'蛋餅','泡菜蛋餅','使用正統韓式泡菜','https://dgz2b3tzb57hl.cloudfront.net/1540f7b8-9893-4a64-9e5c-cdceba3917ce.jpeg',40,'06:00:00','12:30:00'),(1,'蛋餅','玉米蛋餅','使用滿滿金黃玉米粒，讓你每一口都飽足','https://dgz2b3tzb57hl.cloudfront.net/72ebe85d-5bb7-4972-bb8f-ff0de105977e.jpeg',35,'06:00:00','12:30:00'),(1,'飲品','豆漿','當天新鮮出爐，保證選用非基改黃豆研磨製成','https://dgz2b3tzb57hl.cloudfront.net/b89ae713-05e5-4556-8c64-6eb7c67da67b.jpeg',35,'06:00:00','12:30:00'),(1,'飲品','紅茶','茶香濃郁，給您一早好精神','https://dgz2b3tzb57hl.cloudfront.net/a2e30765-659b-4611-abd8-a483ba546fcf.jpeg',25,'06:00:00','12:30:00'),(1,'飲品','奶茶','使用高牧牛奶，完美平衡奶香與茶香','https://dgz2b3tzb57hl.cloudfront.net/5a790822-1bd2-4d59-b4f6-1ab0e36dd8be.jpeg',35,'06:00:00','12:30:00'),(2,'三明治','傳統總匯三明治','全麥土司切邊，美味又健康','https://dgz2b3tzb57hl.cloudfront.net/8cef8e07-329e-47a6-83d3-62516c412b8a.jpeg',70,'09:00:00','12:00:00'),(2,'三明治','精緻熱壓總匯吐司','使用新鮮生菜，加上熱壓焦香，讓您每一口都吃的到營養','https://dgz2b3tzb57hl.cloudfront.net/a7cf6d0a-06eb-4054-ba52-a47df3107d0f.jpeg',80,'09:00:00','14:00:00'),(2,'精緻套餐','地中海式海鮮金黃烘蛋','正統地中海料理，豐富的海鮮讓您每一口都吃的到滿滿鮮味','https://dgz2b3tzb57hl.cloudfront.net/f1b4ab69-8074-47db-80b1-4ae371ddce7c.jpeg',120,'09:00:00','14:00:00'),(2,'精緻套餐','生菜吐司烘蛋','生菜與太陽蛋的完美結合，就算是素食，也吃的到異國美味','https://dgz2b3tzb57hl.cloudfront.net/ead20251-d4cd-4395-8b6f-c2639ad51d9a.jpeg',120,'09:00:00','02:00:00'),(2,'精緻套餐','美式脆薯雙饗宴','滿滿金黃酥脆薯條與義式肉醬熱壓吐司','https://dgz2b3tzb57hl.cloudfront.net/cafa8acf-abfd-4278-8d0f-59b7abd26e19.jpeg',100,'09:00:00','14:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` VALUES (1,'阿珍','member1@gmail.com','0977788899','阿珍早餐店','https://dgz2b3tzb57hl.cloudfront.net/4f2685eb-c7cb-41e8-9324-3508d55952ec.jpeg','台南市永康區中正路970巷18弄22號','23.0407452','120.2391318','06:00:00','12:30:00','星期一',7),(2,'杰','nick@gmail.com','0988888888','杰哥早午餐','https://dgz2b3tzb57hl.cloudfront.net/51d509dd-d6d2-4c12-88a4-1e916eb4c41a.jpeg','台南市永康區中正路279巷21弄59號','23.0297658','120.244021','09:00:00','14:00:00','星期一',7);
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
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_category`
--

LOCK TABLES `shop_category` WRITE;
/*!40000 ALTER TABLE `shop_category` DISABLE KEYS */;
INSERT INTO `shop_category` VALUES (1,'主食'),(2,'燒烤/小吃'),(3,'素食'),(4,'飲品'),(5,'冰品/甜點'),(6,'健康餐盒'),(7,'早餐'),(8,'麵包'),(9,'生鮮雜貨'),(10,'咖啡廳');
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

-- Dump completed on 2023-11-19  8:35:50
