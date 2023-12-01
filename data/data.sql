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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `member_id` int DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `piece` varchar(50) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  KEY `member_id` (`member_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliver`
--

DROP TABLE IF EXISTS `deliver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliver` (
  `deliver_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`deliver_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliver`
--

LOCK TABLES `deliver` WRITE;
/*!40000 ALTER TABLE `deliver` DISABLE KEYS */;
INSERT INTO `deliver` VALUES (1,'member1@gmail.com','member1','0977889666'),(2,'nick@gmail.com','nick','0977889966');
/*!40000 ALTER TABLE `deliver` ENABLE KEYS */;
UNLOCK TABLES;

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
  `phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `merchant_id` (`merchant_id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'member1','member1@gmail.com','scrypt:32768:8:1$upSChadwbATsN83R$1dbe68e35a20f6e4490eae8bedc8ad146601bf4363f04a5f5952073009558ef1d1da44e90e39ea9982fe0b8ee36be6a986a1552a63b5b289aacf2f35c9a20518',1,1,NULL,NULL,'0988877766'),(2,'member2','member2@gmail.com','scrypt:32768:8:1$493Awy0uMJvBsDAm$1b070fe5d25a6734e97c8fdbabcd9f563ef93cd88c6b7ba79f0cdf6a80cd48b1a5052f56e6ea469bd56f6af9041d7882d96574f67422c9c83eddf4a77cda9d21',2,NULL,NULL,NULL,'0978787878'),(3,'member3','member3@gmail.com','scrypt:32768:8:1$6gNKwbp5V92Fblmg$d67c3b1ead634042b461784182dab8a87376b18f59b98278907e10c474ed1cb5110538688dfabd4278ed3df4243e13218f58f6be36441ca6f2805f364058af69',3,NULL,NULL,NULL,'0955666444'),(4,'member4','member4@gmail.com','scrypt:32768:8:1$ZoDj3IuyUa9Arsf8$cdb89d6e69a8e9c2711e2f4e404e44568c4bd4bb0453a480f737a54f750e6a3a7b87125c67c356a6aba8db34621de2f13b053c17b15ad8c0286258cb61c0df89',5,NULL,NULL,NULL,'0988987654'),(5,'member5','member5@gmail.com','scrypt:32768:8:1$tYTS8OToRRMfCxEq$ca5fc1903331d654ca6c725c69f7312daffe55004631b9988e6b8b196db07dcd99557f6ac87fc948d3e59ba470e91c08ccac61e3bdd93e215f67ca414d674d2b',4,NULL,NULL,NULL,'0989753262'),(6,'member6','member6@gmail.com','scrypt:32768:8:1$pkSPlMkLLE9HYJYc$af51325a6d931ac3cdf0d74187b2ffd5e7d269e36a4961e68ca9cf7955b42a2ef219274ff0996b8999ad91d4ac297f5b479b266eeb47b7b4d6dee44a8910752a',NULL,NULL,NULL,NULL,'0966333666'),(7,'','','scrypt:32768:8:1$zMBoWG4xc1eqLQH2$3477ad3653ec7435802b33b9ffad0f68e3fd3ea90e2e498a5ce7d42787ae3ff27588a6b5e58d0f712c79f0998ba60baffa0bdfac4bbb95c7a870b19e2073ec81',NULL,NULL,NULL,NULL,''),(8,'member7','member7@gmail.com','scrypt:32768:8:1$NLG8mdA6Zv6Xfzzl$5b332e69626d6376a492189469068c9cbbf32bcef1fcce6db7fa6a438be49461ad0d4e62f30396aa146b755c5590df0fcfa375c502b34ebba14c7c8f019e4c17',NULL,NULL,NULL,NULL,''),(9,'nick','nick@gmail.com','scrypt:32768:8:1$UXXL0p788MXdKktW$1263a6ff8cc61ee35d0627701faba2577e838966ec92df340fd8670a29519111ec5af5e3ee20130942b5e5868dd30050a726957b2d1791d05a3ee5e174ad704b',NULL,2,NULL,NULL,'0988877766'),(10,'florence','florence@gmail.com','scrypt:32768:8:1$DgikRGLrm6po2XQr$c1ab1849a8234c37878662e75c034d9702e124d416b11a060dd0aaabb536080595773a9a46cb9bd8f6b8767de4a059d7fd1d376bf611c7b87574d224be9f585f',1008,NULL,NULL,NULL,'0988555888'),(11,'nnnk','nnnk@gmail.com','scrypt:32768:8:1$ZzvLKRWhoMZO03lM$dbf0e335cd5e307f4e03fcf421c374a2d432c59e293ff71e910ea4f4689763d1e18b81de3ad0beb69f013b0984dac70f42f51665ce06311362638038ad0b5575',1009,NULL,NULL,NULL,'0966335553');
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
INSERT INTO `menu` VALUES (1,'蛋餅','原味蛋餅','可蛋奶素','https://dgz2b3tzb57hl.cloudfront.net/ca3277f3-3359-4014-acfb-d86bc079c1c0.jpeg',30,'05:00:00','13:00:00'),(1,'蛋餅','泡菜蛋餅','使用正統韓式泡菜','https://dgz2b3tzb57hl.cloudfront.net/28f0c9b7-255c-4b2a-a8da-b9693bb8533b.jpeg',40,'05:00:00','13:00:00'),(1,'蛋餅','玉米蛋餅','包覆滿滿金黃玉米','https://dgz2b3tzb57hl.cloudfront.net/f378ddf6-2d35-4e10-8822-866c696dca47.jpeg',40,'05:00:00','13:00:00'),(1,'三明治','總匯三明治','食材包含生菜、肉片、蛋，讓您每 口都營養均衡','https://dgz2b3tzb57hl.cloudfront.net/9c098a10-9288-43b0-a860-48ad8a6246dd.jpeg',50,'05:00:00','13:00:00'),(1,'飲料','豆漿','使用非基改黃豆，當天研磨熬煮而成','https://dgz2b3tzb57hl.cloudfront.net/9cd28879-623e-4309-a049-2e5e3732d62c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','紅茶','採用正統阿薩姆茶葉，平價享受奢華茶香','https://dgz2b3tzb57hl.cloudfront.net/79583bf8-9a7e-44cf-8844-3661da15eb7c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','奶茶','採用高牧鮮乳，完美平衡奶香與茶香','https://dgz2b3tzb57hl.cloudfront.net/da2592a6-feb0-471d-ba00-e1552599f4da.jpeg',40,'05:00:00','13:00:00'),(2,'便當','水煮雞肉健康餐盒','低鹽低鈉，輕盈健康','https://dgz2b3tzb57hl.cloudfront.net/fd4958d4-6915-424d-b1c6-4ba45c16ac04.jpeg',120,'11:00:00','20:00:00'),(3,'炸物','綜合炸盤','豐富食材，一份套餐多種享受','https://dgz2b3tzb57hl.cloudfront.net/81da0625-7b1a-4690-9e7b-c5da51ff1c1e.jpeg',120,'15:00:00','21:00:00'),(4,'烤雞','烤全雞','整枝跑山雞烤至外皮焦脆可口','https://dgz2b3tzb57hl.cloudfront.net/750870a4-1312-44aa-ba8c-10396fdc8950.jpeg',300,'10:30:00','20:30:00'),(5,'小籠包','鮮肉湯包','採用台灣本地豬肉','https://dgz2b3tzb57hl.cloudfront.net/0b8b6c1f-d133-4594-8a7d-45590ca091b2.jpeg',70,'06:00:00','22:00:00'),(1008,'蔬食便當','有機生鮮蔬食水煮便當','採用有機蔬菜，清水燙煮。清淡不傷身','https://dgz2b3tzb57hl.cloudfront.net/7a0c7883-4ad8-444c-9ed2-a3d58273d005.jpeg',90,'11:00:00','21:00:00'),(1009,'麵包','黃金牛角麵包','堅持當日新鮮出爐','https://dgz2b3tzb57hl.cloudfront.net/2266d092-02ea-4e43-9509-bdddc4bcb67c.jpeg',30,'11:00:00','20:00:00');
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
  `country` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`merchant_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `merchant_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `shop_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1010 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` VALUES (1,'firstOne','member1@gmail.com','0911222111','一號早餐店','https://dgz2b3tzb57hl.cloudfront.net/9a490b9f731dcd419d4dcc92185827c9.jpg','台南市永康區台南市永康區新興街34巷80弄80號','23.0097016','120.2297274','05:00:00','13:00:00','星期一',7,'台南市','永康區'),(2,'阿二','member2@gmail.com','0922323232','阿二健康餐點','https://dgz2b3tzb57hl.cloudfront.net/48d62c92f01f0eed2992af44b9759fc9.jpg','台南市永康區新興街34巷80弄56號','23.0096951','120.2298032','11:00:00','20:00:00','星期一',6,'台南市','永康區'),(3,'三號使用者','member3@gmail.com','0922333222','阿三炸物','https://dgz2b3tzb57hl.cloudfront.net/41a08c35-0278-4e8a-8213-1ca589a59cef.jpeg','台南市永康區中正二街370號','23.0422109','120.2427786','15:00:00','21:00:00','星期一',2,'台南市','永康區'),(4,'挖系耦合','member5@gmail.com','0955888555','五號烤雞','https://dgz2b3tzb57hl.cloudfront.net/0fa0c33a-8560-4406-854d-2b98155f939d.jpeg','高雄市三民區義德路9號','22.643007409511604','120.3352535388141','10:30:00','20:30:00','星期一',2,'高雄市',''),(5,'4號業主','4444@gmail.com','0944555444','台南小籠包','https://dgz2b3tzb57hl.cloudfront.net/3b33ee70d9ee49f7.jpg','台南市東區勝利路254號','22.9998659','120.2348599','06:00:00','22:00:00','星期一',1,'台南市',''),(1006,'許大寶','florence@gmail.com','0988555888','大寶素食','https://dgz2b3tzb57hl.cloudfront.net/f106e8d8-928b-4483-bcd0-3187a66a896f.jpeg','台北市中正區承德路一段750號','25.0486445','121.5164319','11:00:00','21:00:00','星期二',3,'台北市',''),(1007,'許大寶','florence@gmail.com','0988555888','大寶素食','https://dgz2b3tzb57hl.cloudfront.net/01383bf3-5cd5-4a9b-b118-c4bfab4a2b99.jpeg','台北市中正區承德路一段750號','25.0486445','121.5164319','11:00:00','21:00:00','星期二',3,'台北市',''),(1008,'許大寶','florence@gmail.com','0988555888','大寶健康蔬食','https://dgz2b3tzb57hl.cloudfront.net/b865c856-4ca8-4df3-91b0-7d0ff2215ff5.jpeg','台北市中正區北平西路281號','25.0474207','121.5159562','09:00:00','21:00:00','星期二',3,'台北市',''),(1009,'尼克','nnnk@gmail.com','0933567890','尼克烘培坊','https://dgz2b3tzb57hl.cloudfront.net/7bc4774a-7e54-48b8-8856-a33523c4347a.jpeg','台北市萬華區青年路168巷48號','25.0197439','121.501485','11:00:00','20:00:00','星期日',8,'台北市','');
/*!40000 ALTER TABLE `merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_order`
--

DROP TABLE IF EXISTS `new_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_order` (
  `order_id` varchar(50) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `merchant_id` int DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `piece` varchar(50) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `lat` varchar(50) DEFAULT NULL,
  `lng` varchar(50) DEFAULT NULL,
  `status` varchar(30) DEFAULT 'pending',
  `delever` varchar(30) DEFAULT NULL,
  `requireTime` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_order`
--

LOCK TABLES `new_order` WRITE;
/*!40000 ALTER TABLE `new_order` DISABLE KEYS */;
INSERT INTO `new_order` VALUES ('2fbb86c6-e305-456b-8689-237e410cefae',1,1,'原味蛋餅','1','30','802高雄市苓雅區建國一路354號','22.6338273','120.3228343','delivered','member1',55),('c179d1ac-1696-45ce-88ef-391fb31401a7',9,2,'水煮雞肉健康餐盒','1','120','804高雄市鼓山區美術館路80號','22.6566968','120.2865511','accepted',NULL,NULL),('ace3c056-8ef6-4f3a-817d-b8096ec520fb',9,2,'水煮雞肉健康餐盒','1','120','806高雄市前鎮區新光路61號','22.6104438','120.3017989','delivered','member1',65),('5ab59fc7-103b-4e5f-bc6a-f6a9de40edb4',9,4,'烤全雞','1','300','807高雄市三民區大順二路468號9樓','22.649382','120.3249694','pending',NULL,NULL),('83419fb8-2108-4355-806f-fd3286cdd435',9,4,'烤全雞','1','300','804高雄市鼓山區美術館路80號','22.6566968','120.2865511','pending',NULL,NULL),('a63e2a08-cbf3-42a8-b5a9-08045ce44df1',9,4,'烤全雞','1','300','704台南市北區公園北路3號','23.0038507','120.212192','delivered','member1',57);
/*!40000 ALTER TABLE `new_order` ENABLE KEYS */;
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
INSERT INTO `shop_category` VALUES (1,'主食','../static/image/shop_category/spaghetti.png'),(2,'燒烤/小吃','../static/image/shop_category/BBQ.png'),(3,'素食','../static/image/shop_category/vegan.png'),(4,'飲品','../static/image/shop_category/bubble-tea.png'),(5,'冰品/甜點','../static/image/shop_category/desert.png'),(6,'健康餐盒','../static/image/shop_category/healthy_food.png'),(7,'早餐','../static/image/shop_category/breakfast.png'),(8,'麵包','../static/image/shop_category/bread.png'),(9,'生鮮雜貨','../static/image/shop_category/grocery.png'),(10,'咖啡廳','../static/image/shop_category/coffee.png');
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

-- Dump completed on 2023-12-01  8:35:52
