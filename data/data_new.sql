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
INSERT INTO `cart` VALUES (25,4,'烤全雞','1','300');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliver`
--

LOCK TABLES `deliver` WRITE;
/*!40000 ALTER TABLE `deliver` DISABLE KEYS */;
INSERT INTO `deliver` VALUES (1,'member1@gmail.com','member1','0977889666'),(2,'nick@gmail.com','nick','0977889966'),(3,'delecer1@gmail.com','delever1','0923363262'),(4,'deliver2@gmail.com','deliver2','0913262131'),(5,'deliver3@gmail.com','deliver3','0931263765'),(6,'deliver4@gmail.com','deliver4','0936789987'),(7,'deliver5@gmail.com','deliver5','0956787989'),(8,'deliver6@gmail.com','deliver6','0936789686'),(9,'deliver7@gmail.com','deliver7','0977889966'),(10,'deliver8@gmail.com','deliver8','0988888888'),(11,'deliver9@gmail.com','deliver9','0999999999'),(12,'member2@gmail.com','member2','0922335566'),(13,'deliver1@gmail.com','deliver1','0913666222'),(14,'member10@gmail.com','member10','0910000111'),(15,'member9@gmail.com','member9','0999999999');
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
  KEY `delever_id` (`delever_id`),
  KEY `merchant_id` (`merchant_id`),
  CONSTRAINT `member_ibfk_2` FOREIGN KEY (`delever_id`) REFERENCES `deliver` (`deliver_id`),
  CONSTRAINT `member_ibfk_3` FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'member1','member1@gmail.com','scrypt:32768:8:1$upSChadwbATsN83R$1dbe68e35a20f6e4490eae8bedc8ad146601bf4363f04a5f5952073009558ef1d1da44e90e39ea9982fe0b8ee36be6a986a1552a63b5b289aacf2f35c9a20518',1,1,NULL,NULL,'0988877766'),(2,'member2','member2@gmail.com','scrypt:32768:8:1$493Awy0uMJvBsDAm$1b070fe5d25a6734e97c8fdbabcd9f563ef93cd88c6b7ba79f0cdf6a80cd48b1a5052f56e6ea469bd56f6af9041d7882d96574f67422c9c83eddf4a77cda9d21',2,12,NULL,NULL,'0978787878'),(3,'member3','member3@gmail.com','scrypt:32768:8:1$6gNKwbp5V92Fblmg$d67c3b1ead634042b461784182dab8a87376b18f59b98278907e10c474ed1cb5110538688dfabd4278ed3df4243e13218f58f6be36441ca6f2805f364058af69',3,NULL,NULL,NULL,'0955666444'),(4,'member4','member4@gmail.com','scrypt:32768:8:1$ZoDj3IuyUa9Arsf8$cdb89d6e69a8e9c2711e2f4e404e44568c4bd4bb0453a480f737a54f750e6a3a7b87125c67c356a6aba8db34621de2f13b053c17b15ad8c0286258cb61c0df89',5,NULL,NULL,NULL,'0988987654'),(5,'member5','member5@gmail.com','scrypt:32768:8:1$tYTS8OToRRMfCxEq$ca5fc1903331d654ca6c725c69f7312daffe55004631b9988e6b8b196db07dcd99557f6ac87fc948d3e59ba470e91c08ccac61e3bdd93e215f67ca414d674d2b',4,NULL,NULL,NULL,'0989753262'),(6,'member6','member6@gmail.com','scrypt:32768:8:1$pkSPlMkLLE9HYJYc$af51325a6d931ac3cdf0d74187b2ffd5e7d269e36a4961e68ca9cf7955b42a2ef219274ff0996b8999ad91d4ac297f5b479b266eeb47b7b4d6dee44a8910752a',NULL,NULL,NULL,NULL,'0966333666'),(7,'','','scrypt:32768:8:1$zMBoWG4xc1eqLQH2$3477ad3653ec7435802b33b9ffad0f68e3fd3ea90e2e498a5ce7d42787ae3ff27588a6b5e58d0f712c79f0998ba60baffa0bdfac4bbb95c7a870b19e2073ec81',NULL,NULL,NULL,NULL,''),(8,'member7','member7@gmail.com','scrypt:32768:8:1$NLG8mdA6Zv6Xfzzl$5b332e69626d6376a492189469068c9cbbf32bcef1fcce6db7fa6a438be49461ad0d4e62f30396aa146b755c5590df0fcfa375c502b34ebba14c7c8f019e4c17',NULL,NULL,NULL,NULL,''),(9,'nick','nick@gmail.com','scrypt:32768:8:1$UXXL0p788MXdKktW$1263a6ff8cc61ee35d0627701faba2577e838966ec92df340fd8670a29519111ec5af5e3ee20130942b5e5868dd30050a726957b2d1791d05a3ee5e174ad704b',NULL,2,NULL,NULL,'0988877766'),(10,'florence','florence@gmail.com','scrypt:32768:8:1$DgikRGLrm6po2XQr$c1ab1849a8234c37878662e75c034d9702e124d416b11a060dd0aaabb536080595773a9a46cb9bd8f6b8767de4a059d7fd1d376bf611c7b87574d224be9f585f',1008,NULL,NULL,NULL,'0988555888'),(11,'nnnk','nnnk@gmail.com','scrypt:32768:8:1$ZzvLKRWhoMZO03lM$dbf0e335cd5e307f4e03fcf421c374a2d432c59e293ff71e910ea4f4689763d1e18b81de3ad0beb69f013b0984dac70f42f51665ce06311362638038ad0b5575',1009,NULL,NULL,NULL,'0966335553'),(12,'eunice','eunice@gmail.com','scrypt:32768:8:1$RQpRiVv0h2iRGFgE$f3b3b0f975fe71a1573b2d4971e248484ffef3c079dff1b34bc06eb4fb1405434afdf230e9a831d30ef35519060733a9cb6efd92de85262960e7cb3555993225',1010,NULL,NULL,NULL,'0966222333'),(13,'delever1','delecer1@gmail.com','scrypt:32768:8:1$8NaHUOpMgRplBPNr$0e469362dd659af74615122d1deebf0083e508d59ca7d65760787d3499c19cc4972f2443e7db7b8f1c07ba39ada71d5f8f3b9db6fbbb6e7c102efe15c8ee9d58',NULL,3,NULL,NULL,'0936262535'),(14,'deliver2','deliver2@gmail.com','scrypt:32768:8:1$PxMMHJILlZXtT9mj$d8efb5b81949a2840467700eda697fb220ce0c39cc2d9b7279d94e1ceb0ae3b0c5f5a11fda235355ea1064099d9b85b3fd8ddc0bcbc95d14565c15ace891968b',1015,4,NULL,NULL,'0913262131'),(15,'deliver3','deliver3@gmail.com','scrypt:32768:8:1$h4dLpjUR4uqYXMeG$de4c73f537ea67d85c1a71012d0d1504650158df3f549dccf9de15a7cc978af3f56b3595cedd11c758b879ef18d437d775a75a07744abb64d07c4ce82321b26c',1016,5,NULL,NULL,'0933898464'),(16,'deliver4','deliver4@gmail.com','scrypt:32768:8:1$kls4zTkl0fa5AVQi$a7a4797fbb79372128e4c8199dade6ac0ec41a7f3c458ffbe8391f582b47a4678047e005e4dca43b8a7a379889f6a75827613faa12738acb5dc96a30a6eed2b3',NULL,6,NULL,NULL,'0946235764'),(17,'deliver5','deliver5@gmail.com','scrypt:32768:8:1$YutsoRVuQZeypNbi$d62d7d84e01d0a9de0107ee607fdeb9175aa2b933b22863f138272424d8b8de72c6ea9c574d28b58320ae146b224c7d524053578b3a99578c281a8eb001cb932',NULL,7,NULL,NULL,'0955686787'),(18,'deliver6','deliver6@gmail.com','scrypt:32768:8:1$nupKh7clVuS3DFwD$f4e6b2e29f20afb0161603ab7cc5ada439c6028e54df8993003c2760a63aeb1da6e5fb3436baf985c939d480da6cc2258b323afde7c12be87b62aa246d28e746',NULL,8,NULL,NULL,'0968789686'),(19,'deliver7','deliver7@gmail.com','scrypt:32768:8:1$fMb74CpBAEWTaKoo$fd614f2e3c5a47252e1589f15884c5599c4cdbb83524e1f152545181b848cb1bad664b7ce8dd400c10f1d0aa5dea15b056a8d2ad22d45c068b4cfa87d5e88aa0',NULL,9,NULL,NULL,'0977889966'),(20,'deliver8','deliver8@gmail.com','scrypt:32768:8:1$7DYRPC5B0h1hoKFz$369215ad471aa6f16efa6ab58b524ad1e8d40e179b3932aa14419e73ea1cba5eafb72db59bd067581e7c779425311b5eea25c40ed5912f450c017e0088e7e598',NULL,10,NULL,NULL,'0988888888'),(21,'deliver9','deliver9@gmail.com','scrypt:32768:8:1$dNUox4ZXQhVX2uXQ$9b6e79d95db4ca35e5b5d832a4381ed3d68e2f53e030cf255896e8ed4f99941d18f598e8226c9c47170bbe2bcdcf1dc9521174b50fa046234c888587782eb406',NULL,11,NULL,NULL,'099999999'),(22,'merchant1','merchant1@gmail.com','scrypt:32768:8:1$fbWdQ4r4stpMOwnF$08e5d226b829fa1af542ed28a97bc57ea88244b6ba82c84782c3f4e3b7064ee91c4069e231e94347b44272578f55ec13eb4558477bbc86e328eb78fbea25a7fe',NULL,NULL,NULL,NULL,'0988779001'),(23,'member8','member8@gmail.com','scrypt:32768:8:1$T75HzVoTl8YkhQvT$a422d5d8f6a54538046d6c8b2316776a61a2a1cb0255d98749924a59832b77e8e31ed36d0285514cccb2eafaf360b8dac14f4f261962bbbaa3ae5e3d1b000f94',NULL,NULL,NULL,NULL,'0988886777'),(24,'deliver1','deliver1@gmail.com','scrypt:32768:8:1$45uOUFQHHMzzP5Ay$270df5c6cf2312b6506a1cc07bc0568acdaf2c23e37034a1a1537db1cafadb826c75b39e433da3cec5f86307f16c206320537dec489dd5d023e63197f654d90a',1014,13,NULL,NULL,'0911131311'),(25,'test','test@gmail.com','scrypt:32768:8:1$q8RXqnYXwPKgTDxw$9d91003b6620c4d297f8875557a968d54bb4c8e9646d3e50b6b9c4347483ba99a7e0dd9c3360b131e1a1f63d457307fb581bb7d2e78adb829e81e503864dfd8f',NULL,NULL,NULL,NULL,'0977889996'),(26,'new_account','new_email@example.com','scrypt:32768:8:1$9gpBu5JOW006M0tN$a3a74b6814fe5075aae6fb5ba58ebff65e7f1cc017d6cce6423559f565d5482f53723b54f405c9e7025b91d970881f1b112896ba6fed84c644d8aaebce7356aa',NULL,NULL,NULL,NULL,'0988888888'),(27,'member9','member9@gmail.com','scrypt:32768:8:1$IUZMhWTEtWpEdCqQ$de42acd6c618207e9328428a17e945b98efeabad3fbfc38a5abeba700b7d0444871ff5a7ea1fa839e4d487191d1fbf385fc1c989767f88c9d33ddfe27cc06ef1',NULL,15,NULL,NULL,'0999999999'),(28,'member10','member10@gmail.com','scrypt:32768:8:1$Cd2ehQRYvfpEBR6E$b5cd95c21f5859e69ccff3f131c5dd927573df78fbbbd5f284d57e6d3d61524f1756874a50223a6df8faeec4aaaf37a2c5fe90cfb52b56ddeb0ec3a0bbf04106',NULL,14,NULL,NULL,'0910000111');
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
INSERT INTO `menu` VALUES (1,'蛋餅','原味蛋餅','可蛋奶素','https://dgz2b3tzb57hl.cloudfront.net/ca3277f3-3359-4014-acfb-d86bc079c1c0.jpeg',30,'05:00:00','13:00:00'),(1,'蛋餅','泡菜蛋餅','使用正統韓式泡菜','https://dgz2b3tzb57hl.cloudfront.net/28f0c9b7-255c-4b2a-a8da-b9693bb8533b.jpeg',40,'05:00:00','13:00:00'),(1,'蛋餅','玉米蛋餅','包覆滿滿金黃玉米','https://dgz2b3tzb57hl.cloudfront.net/f378ddf6-2d35-4e10-8822-866c696dca47.jpeg',40,'05:00:00','13:00:00'),(1,'三明治','總匯三明治','食材包含生菜、肉片、蛋，讓您每 口都營養均衡','https://dgz2b3tzb57hl.cloudfront.net/9c098a10-9288-43b0-a860-48ad8a6246dd.jpeg',50,'05:00:00','13:00:00'),(1,'飲料','豆漿','使用非基改黃豆，當天研磨熬煮而成','https://dgz2b3tzb57hl.cloudfront.net/9cd28879-623e-4309-a049-2e5e3732d62c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','紅茶','採用正統阿薩姆茶葉，平價享受奢華茶香','https://dgz2b3tzb57hl.cloudfront.net/79583bf8-9a7e-44cf-8844-3661da15eb7c.jpeg',30,'05:00:00','13:00:00'),(1,'飲料','奶茶','採用高牧鮮乳，完美平衡奶香與茶香','https://dgz2b3tzb57hl.cloudfront.net/da2592a6-feb0-471d-ba00-e1552599f4da.jpeg',40,'05:00:00','13:00:00'),(2,'便當','水煮雞肉健康餐盒','低鹽低鈉，輕盈健康','https://dgz2b3tzb57hl.cloudfront.net/2f5b5052-250e-4d94-b3e6-094ba2c6d219.jpeg',120,'11:00:00','20:00:00'),(3,'炸物','綜合炸盤','豐富食材，一份套餐多種享受','https://dgz2b3tzb57hl.cloudfront.net/41a08c35-0278-4e8a-8213-1ca589a59cef.jpeg',120,'15:00:00','21:00:00'),(4,'烤雞','烤全雞','整枝跑山雞烤至外皮焦脆可口','https://dgz2b3tzb57hl.cloudfront.net/0fa0c33a-8560-4406-854d-2b98155f939d.jpeg',300,'10:30:00','20:30:00'),(5,'小籠包','鮮肉湯包','採用台灣本地豬肉','https://dgz2b3tzb57hl.cloudfront.net/0b8b6c1f-d133-4594-8a7d-45590ca091b2.jpeg',70,'06:00:00','22:00:00'),(1008,'蔬食便當','有機生鮮蔬食水煮便當','採用有機蔬菜，清水燙煮。清淡不傷身','https://dgz2b3tzb57hl.cloudfront.net/7a0c7883-4ad8-444c-9ed2-a3d58273d005.jpeg',90,'11:00:00','21:00:00'),(1009,'麵包','黃金牛角麵包','堅持當日新鮮出爐','https://dgz2b3tzb57hl.cloudfront.net/2266d092-02ea-4e43-9509-bdddc4bcb67c.jpeg',30,'11:00:00','20:00:00'),(1010,'三明治','生菜火腿碳烤三明治','新鮮生菜加上多汁火腿，精準火烤5分鐘，熱騰騰上桌','https://dgz2b3tzb57hl.cloudfront.net/23e1a273-9b04-4c9c-aa39-4f2d19b96a8d.jpeg',45,'06:30:00','00:00:00'),(6,'火鍋','正統酸菜魚','來自中國，正統好滋味','https://dgz2b3tzb57hl.cloudfront.net/iwqjmflkoi2561.jpg',899,'11:00:00','22:00:00'),(7,'義大利麵','紅醬義大利麵','紅醬熬自新鮮番茄，給你新鮮好滋味','https://dgz2b3tzb57hl.cloudfront.net/bk154-010.jpg',899,'11:00:00','20:00:00'),(8,'健康套餐','藥膳雞健康套餐','中藥熬煮，溫和滋補身體','https://dgz2b3tzb57hl.cloudfront.net/2f5b5052-250e-4d94-b3e6-094ba2c6d219.jpeg',240,'11:00:00','20:00:00'),(9,'火鍋','當歸羊肉火鍋','紅遍高雄的岡山羊肉，來一訂要點一鍋','https://dgz2b3tzb57hl.cloudfront.net/iwqjmflkoi2561.jpg',650,'17:00:00','22:00:00'),(10,'蛋餅','燻雞蛋餅','料多味美','https://dgz2b3tzb57hl.cloudfront.net/28f0c9b7-255c-4b2a-a8da-b9693bb8533b.jpeg',50,'05:30:00','13:00:00'),(11,'麵食類','鮮味海產麵','新鮮海產加上古早味粗米粉，讓您流連忘返的高雄好滋味','https://dgz2b3tzb57hl.cloudfront.net/78abe62f7433bf7dc2a4612ecba997a1.jpg',60,'05:30:00','13:00:00'),(12,'米食類','古早味肉燥飯','老魯澆飯，簡單樸實卻留齒存香','https://dgz2b3tzb57hl.cloudfront.net/49615113jhkbftyj.jfif',35,'11:30:00','19:00:00'),(1014,'水果切盤','柳丁切盤','新鮮柳丁切盤','https://dgz2b3tzb57hl.cloudfront.net/b8cac514-f6fb-46d9-8d5f-7bede69226ff.jpeg',60,'09:00:00','17:00:00'),(1015,'單點小點心','培根佐沙拉義式吐司','正統義式吐司加上地中海式生菜吧，給你豐富營養','https://dgz2b3tzb57hl.cloudfront.net/273fa479-eb11-4f90-a506-241a947b4bfb.jpeg',70,'11:00:00','20:00:00'),(1016,'水果茶','蘋果百香雙果茶','酸酸甜甜好滋味','https://dgz2b3tzb57hl.cloudfront.net/12c1e6c6-24e2-497c-8b63-acf7af036c28.jpeg',60,'09:00:00','22:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=1017 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` VALUES (1,'firstOne','member1@gmail.com','0911222111','一號早餐店','https://dgz2b3tzb57hl.cloudfront.net/9a490b9f731dcd419d4dcc92185827c9.jpg','台南市永康區台南市永康區新興街34巷80弄80號','23.0097016','120.2297274','05:00:00','13:00:00','星期一',7,'台南市','永康區'),(2,'阿二','member2@gmail.com','0922323232','阿二健康餐點','https://dgz2b3tzb57hl.cloudfront.net/48d62c92f01f0eed2992af44b9759fc9.jpg','台南市永康區新興街34巷80弄56號','23.0096951','120.2298032','11:00:00','20:00:00','星期一',6,'台南市','永康區'),(3,'三號使用者','member3@gmail.com','0922333222','阿三炸物','https://dgz2b3tzb57hl.cloudfront.net/41a08c35-0278-4e8a-8213-1ca589a59cef.jpeg','台南市永康區中正二街370號','23.0422109','120.2427786','15:00:00','21:00:00','星期一',2,'台南市','永康區'),(4,'挖系耦合','member5@gmail.com','0955888555','五號烤雞','https://dgz2b3tzb57hl.cloudfront.net/0fa0c33a-8560-4406-854d-2b98155f939d.jpeg','高雄市三民區義德路9號','22.643007409511604','120.3352535388141','10:30:00','20:30:00','星期一',2,'高雄市',''),(5,'4號業主','4444@gmail.com','0944555444','台南小籠包','https://dgz2b3tzb57hl.cloudfront.net/3b33ee70d9ee49f7.jpg','台南市東區勝利路254號','22.9998659','120.2348599','06:00:00','22:00:00','星期一',1,'台南市',''),(6,'3272',NULL,'07-3450129','一椒一魚-老罈酸菜魚','https://dgz2b3tzb57hl.cloudfront.net/iwqjmflkoi2561.jpg','高雄市三民區明仁路53號','22.6614052','120.3141848','11:00:00','22:00:00','星期一',1,'高雄市',NULL),(7,'3271',NULL,'07-3506700','DELI  PUPPY寵物友善餐廳','https://dgz2b3tzb57hl.cloudfront.net/bk154-010.jpg','高雄市三民區明吉路11號','22.6621099','120.3132312','11:00:00','20:00:00','星期一',1,'高雄市',NULL),(8,'3270',NULL,'07-34561860','DELI  綠之屋','https://dgz2b3tzb57hl.cloudfront.net/2f5b5052-250e-4d94-b3e6-094ba2c6d219.jpeg','高雄市三民區鼎泰里明哲路２２號','22.6614313','120.3134692','11:00:00','20:00:00','星期二',1,'高雄市',NULL),(9,'3268',NULL,'07-5597758','舊市羊肉','https://dgz2b3tzb57hl.cloudfront.net/2f5b5052-250e-4d94-b3e6-094ba2c6d219.jpeg','高雄市鼓山區龍子里裕誠路１９５０號','22.6585291','120.2939221','17:00:00','22:00:00','星期一',1,'高雄市',NULL),(10,'3266',NULL,'07-3114765','秋田元氣早餐','https://dgz2b3tzb57hl.cloudfront.net/9a490b9f731dcd419d4dcc92185827c9.jpg','高雄市三民區安生里自忠街６７號１樓','22.646241','120.311665','05:30:00','13:00:00','星期三',7,'高雄市',NULL),(11,'3264',NULL,'0987248112','鮮聚海產粥','https://dgz2b3tzb57hl.cloudfront.net/78abe62f7433bf7dc2a4612ecba997a1.jpg','高雄市三民區同德里熱河一街６２號','22.6434549','120.3122092','05:30:00','13:00:00','星期三',1,'高雄市',NULL),(12,'3263',NULL,'07-3238968','朱記湖南炸醬麵','https://dgz2b3tzb57hl.cloudfront.net/49615113jhkbftyj.jfif','高雄市三民區同德里熱河一街７５號１樓','22.6432783','120.3118696','11:30:00','19:00:00','星期一',1,'高雄市',NULL),(1008,'許大寶','florence@gmail.com','0988555888','大寶健康蔬食','https://dgz2b3tzb57hl.cloudfront.net/2f5b5052-250e-4d94-b3e6-094ba2c6d219.jpeg','台北市中正區北平西路281號','25.0474207','121.5159562','09:00:00','21:00:00','星期二',3,'台北市',''),(1009,'尼克','nnnk@gmail.com','0933567890','尼克烘培坊','https://dgz2b3tzb57hl.cloudfront.net/2266d092-02ea-4e43-9509-bdddc4bcb67c.jpeg','台北市萬華區青年路168巷48號','25.0197439','121.501485','11:00:00','20:00:00','星期日',8,'台北市',''),(1010,'eunice','eunice@gmail.com','0922333666','飄香碳烤三明治','https://dgz2b3tzb57hl.cloudfront.net/23e1a273-9b04-4c9c-aa39-4f2d19b96a8d.jpeg','台南市永康區和平路261巷30號','23.0569728','120.2640043','06:30:00','00:00:00','星期日,星期六',7,'台南市',''),(1014,'deliver1','deliver1@gmail.com','0911131311','花子水果行','https://dgz2b3tzb57hl.cloudfront.net/f9c71c2a-0e4a-476d-80f6-6bdde5c6fb37.jpeg','台北市信義區信義路五段台北世界貿易中心 展覽大樓 (世貿一館)','25.0334826','121.562377','09:00:00','17:00:00','星期二',9,'台北市',''),(1015,'deliver2','deliver2@gmail.com','0913262131','小餐義式簡餐','https://dgz2b3tzb57hl.cloudfront.net/5f9cf31a-c35f-4519-b3ca-3b7f67aab3cc.jpeg','台北市中山區中山北路三段台北市立美術館','25.0724118','121.5248102','11:00:00','20:00:00','星期三',1,'台北市',''),(1016,'deliver3','deliver3@gmail.com','0933898464','苑子水果茶行','https://dgz2b3tzb57hl.cloudfront.net/0e40895e-da97-49b7-98ed-dadff6dbc259.jpeg','台北市文山區新光路二段300號','24.993708','121.573831','09:00:00','22:00:00','星期一',4,'台北市','');
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
INSERT INTO `new_order` VALUES ('273a5a2e-e108-415b-a6ee-448ec0689d52',1,1,'原味蛋餅','1','30','704台南市北區公園北路3號','23.0038507','120.212192','delivered','member2',23),('273a5a2e-e108-415b-a6ee-448ec0689d52',1,1,'泡菜蛋餅','1','40','704台南市北區公園北路3號','23.0038507','120.212192','delivered','member2',23),('5d00ea01-28db-46a2-8cb8-1529f37ab304',1,4,'烤全雞','1','300','70041台南市中西區忠義路二段1號','22.990375','120.2013554','delivered','deliver1',57),('cd756d95-d023-4861-b622-c9bc00cfcec2',1,1,'原味蛋餅','1','30','70041台南市中西區忠義路二段1號','22.990375','120.2013554','delivered','member2',31),('cd756d95-d023-4861-b622-c9bc00cfcec2',1,1,'泡菜蛋餅','1','40','70041台南市中西區忠義路二段1號','22.990375','120.2013554','delivered','member2',31),('97d12fcf-e43c-44db-9018-3f5ad52e39ea',1,4,'烤全雞','1','300','807高雄市三民區大順二路468號9樓','22.649382','120.3249694','delivered','deliver1',14),('d8f899bd-fc6a-418b-9c20-be88f653a491',1,4,'烤全雞','1','300','804高雄市鼓山區美術館路80號','22.6566968','120.2865511','delivered','deliver1',29),('121e9268-f452-4c49-aa92-146330179a6c',1,4,'烤全雞','1','300','807高雄市三民區大順二路468號9樓','22.649382','120.3249694','delivered','deliver1',14),('33d2a99f-517f-43b5-a206-4804b8eb10e3',23,4,'烤全雞','1','300','10617台北市大安區羅斯福路四段1號','25.0173405','121.5397518','delivered','deliver1',232),('abd3dbdd-bbe4-4cbf-a680-66c43422c86d',23,4,'烤全雞','1','300','台灣大學','25.0173405','121.5397518','delivered','deliver1',233),('abd3dbdd-bbe4-4cbf-a680-66c43422c86d',23,4,'烤全雞','1','300','台灣大學','25.0173405','121.5397518','delivered','deliver1',233),('f24e8bdd-0e1a-455f-badd-0df5cbb5c672',23,4,'烤全雞','1','300','台灣大學','25.0173405','121.5397518','delivered','deliver1',233),('ec660149-9d10-48be-a616-236f09a4971e',23,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','delivered','member2',31),('9a817433-c769-4da5-9fab-1325c3b5bdf9',1,4,'烤全雞','1','300','高雄醫學大學','22.64727','120.3107468','delivered','deliver1',20),('74b27be8-bf18-4d44-99a5-30f44093c73f',1,4,'烤全雞','1','300','成功大學','25.0173405','121.5397518','delivered','deliver1',57),('f6c9073f-439b-4fec-bb48-c4ac1207f2d3',24,1,'原味蛋餅','1','30','高雄醫學大學','22.64727','120.3107468','delivered','deliver1',69),('56f43afd-8f66-446a-8b55-34df03e5a73d',24,1,'泡菜蛋餅','1','40','高雄醫學大學','22.64727','120.3107468','delivered','deliver1',71),('7bbca47f-85cc-4a9c-a0f7-7db1ca446023',24,4,'烤全雞','1','300','807高雄市三民區大順二路468號9樓','22.649382','120.3249694','delivered','member2',14),('48642394-0980-41f9-a2ef-dfea60e0714f',24,4,'烤全雞','2','600','807高雄市三民區大順二路657號','22.65055289999999','120.3228361','delivered','member2',16),('d3dcd811-189a-4a33-840b-cd0e10588623',24,4,'烤全雞','1','300','807高雄市三民區大順二路','22.6497488','120.3240657','delivered','member2',15),('ec22e9b6-41f6-484e-a353-6d1c23b09e7a',24,4,'烤全雞','2','600','高雄市三民區建工路路易．莎咖啡大順建工門市','22.6272784','120.3014353','accepted','member2',15),('c59db5dc-3c19-4ed6-bd23-63eadef0dd98',24,4,'烤全雞','1','300','804高雄市鼓山區大順一路111號','22.656376','120.3070089','accepted','member2',23),('ed09ef95-8f88-4703-8983-1da3051af96a',2,1,'原味蛋餅','1','30','710台南市永康區和平路241巷12號','23.0569889','120.2646069','delivered','deliver1',39),('7f1f2610-eaad-4d3d-8271-c352f522150c',1,1,'原味蛋餅','1','30','710台南市永康區和平路253巷','23.0571466','120.2656085','delivered','deliver1',38),('e476dbb7-1acb-4724-b279-8016f1b0a2a1',24,1008,'有機生鮮蔬食水煮便當','1','90','104台北市中山區民權西路70巷','25.0614531','121.5201433','delivered','member2',17),('e40c5123-bb66-4d27-92f3-e61415c1faab',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','accepted',NULL,NULL),('79d9f156-b30e-4340-b345-f75226f04b67',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','delivered',NULL,NULL),('6aa6c6d9-11a2-4ad4-8199-b4f7e4289807',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','accepted',NULL,NULL),('d8d72285-8028-4a41-8d5a-008ad3daaf07',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','delivered','member2',17),('3f839b55-8507-4f42-817e-2ba858dce8d0',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0630996','121.5156557','accepted','member2',17),('a085e5c3-5c27-41dd-a03a-a143f57afe11',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','delivered','member2',19),('87db16c8-dadc-45cc-9908-8b6488868825',2,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','delivered','deliver1',19),('c816dbd2-3e59-485f-806c-7748a222a422',24,1008,'有機生鮮蔬食水煮便當','1','90','台北市中山區民權西路','25.0627693','121.5204057','delivered','member1',17),('1be44fbc-2443-4ca1-8294-262b73b5383b',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','accepted','deliver1',32),('7c8556ca-f5ae-41ef-9921-70b2782b4200',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','accepted','deliver1',32),('242b032b-91ee-4774-8a41-d8b0fd5234ad',2,1,'原味蛋餅','1','30','台南永康和欣客運','23.0417','120.24905','accepted','deliver1',35),('b8c2119d-b443-45d6-ad33-bf8045ff5881',2,2,'水煮雞肉健康餐盒','1','120','台南永康和欣客運','23.0417','120.24905','delivered','deliver1',36),('5adb2b9b-f589-429f-9e43-7fa271991cf6',2,2,'水煮雞肉健康餐盒','1','120','台南永康和欣客運','23.0417','120.24905','delivered','deliver1',36),('88394066-698e-4118-9137-a1d35cfd6e57',2,2,'水煮雞肉健康餐盒','1','120','台南市永康區和欣客運','23.0211799','120.262788','delivered','deliver1',32),('eac50b86-4691-4374-aa5f-d126feb8ee48',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','delivered','deliver1',32),('9723d851-9bae-444d-8fdd-4097d12699e1',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','delivered','deliver1',32),('b64af5c8-e927-474b-886a-6098957f1ba2',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','delivered','deliver1',31),('7b7538bf-eebe-42eb-bd14-eb8be9e1416f',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','accepted','deliver1',32),('44abd19b-36ff-402f-ad71-3618357f5af0',2,1,'原味蛋餅','1','30','710台南市永康區中正北路952-7號','23.0564039','120.2742618','delivered','deliver1',39),('7675cfd8-b5f1-4ea8-a966-a6d59306a035',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','delivered','deliver1',32),('cc05f3d5-4d9b-4beb-b56b-f16133e0dfba',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','accepted','deliver1',32),('283372c9-1d67-43af-9674-bfd56d7812e7',2,1,'原味蛋餅','1','30','台南市永康區和欣客運','23.0211799','120.262788','accepted','deliver1',29),('0dd9bc44-1fe2-44ea-886f-a77176db386e',2,1,'原味蛋餅','1','30','台南市永康和欣客運','23.0417','120.24905','delivered','deliver1',33),('8e46d750-0487-4e98-b702-fc57d8e1d622',2,1,'原味蛋餅','1','30','710台南市永康區中正北路952-7號','23.0564039','120.2742618','accepted','deliver1',39),('fb04a5a7-b435-427d-bf51-c5688ee74c3f',2,1,'原味蛋餅','1','30','台南市永康區北外環道路','23.0597179','120.2585806','accepted','deliver1',38),('ff5285c2-00e7-4dcd-b78e-51c59858eda3',2,1,'原味蛋餅','1','30','台南永康區北外環道路','23.0597179','120.2585806','accepted','deliver1',38),('3effafb5-06aa-4d72-80ae-7515b71f9675',2,1,'原味蛋餅','1','30','台南市永康區北外環道路','23.0597179','120.2585806','accepted','deliver1',38),('74f57996-8199-47c2-a0f0-db6d1fe3a057',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','accepted','deliver1',33),('5f0f9f46-43ad-42d2-aca4-349f251c0c9d',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','delivered','deliver1',36),('283f15dc-c3c1-4b1d-a821-5455a2427cf0',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','accepted','deliver1',36),('31a41136-de9e-480b-94b3-68d094578f94',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','accepted','deliver1',36),('d5d14ab2-9317-494c-af74-137f1b176df4',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','delivered',NULL,NULL),('5e2d9c2c-df6e-4aa1-bc8e-b01804275d5c',2,1,'原味蛋餅','1','30','台南應用科技大學','23.0393401','120.2391669','delivered','deliver1',31),('b5f89216-02e7-4328-b6bd-2b0a196af304',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted',NULL,NULL),('1ff99acd-4494-4ce9-8f99-1149efe04699',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted',NULL,NULL),('645c55f5-23e6-43e0-8ee6-0afbe3448135',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted',NULL,NULL),('2d569f5f-d25c-45de-bb74-2246bb130818',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted',NULL,NULL),('4721abd1-0911-40e5-bac8-20848e9cc897',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',20),('a19a718f-c176-4312-983d-f673d1be9c4a',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',18),('edc25db1-56c1-4838-9026-2007f48e3c6c',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',18),('14608553-4c17-4253-b93a-e938aa27ddd5',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',18),('5acc137e-1a8c-4063-be6d-1e6db27facb2',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',18),('492cd14f-d010-4200-9a73-576fdfdbdf6e',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','canceled','deliver1',18),('75bf9a13-9ff1-41ab-a6ff-a7950699acfd',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','canceled','member1',17),('a0a9cfe4-eeca-42b0-8655-45bf15e5ebff',1,1,'泡菜蛋餅','1','40','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','member1',20),('78e82cd8-8cd7-4a7a-b573-b872ccf6ccfe',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','member1',20),('34387fbb-e3d7-48b7-ae08-a464c7eeb7b4',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','member1',20),('cc683529-5f18-49a2-94e4-4fea01359db6',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered',NULL,NULL),('d593701f-15ee-49e3-8fe5-4301970c55cc',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','member1',18),('56e3ab83-21f6-436d-bcbe-50b6bfc29276',1,1,'泡菜蛋餅','1','40','710台南市永康區中正路970巷','23.0409035','120.2393369','delivered',NULL,NULL),('cbb0645b-bbe8-47ef-80be-06d62d842987',1,1,'泡菜蛋餅','1','40','710台南市永康區中正路529號','23.0393401','120.2391669','delivered','member9',33),('9d429370-10e0-47af-bfc2-3ef2709a1975',1,1,'原味蛋餅','1','30','710台南市永康區中正路529號','23.0393401','120.2391669','delivered','member9',31),('16190057-8cac-469e-b0bb-e6bdfc2e314c',1,1,'原味蛋餅','1','30','710台南市永康區中正路529號','23.0393401','120.2391669','delivered','member9',36),('28b35380-bdce-4c75-ad63-4aadaea42ab6',1,1,'原味蛋餅','1','30','710台南市永康區中正路529號','23.0393401','120.2391669','delivered','member9',33),('5c9ba420-3f75-452f-97f1-4378217ebb72',1,1,'原味蛋餅','1','30','70041台南市中西區忠義路二段1號','22.990375','120.2013554','delivered','member9',36),('4b61669a-f1c5-409f-b500-4da9641bad9a',1,1,'原味蛋餅','1','30','70041台南市中西區忠義路二段1號','22.990375','120.2013554','delivered','member9',36),('c1737849-c6e2-4ca7-9fee-d09bb28d69bd',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',28),('6f68be1f-90bc-43fb-a982-f39a3d6a9d54',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',20),('0d4bf30c-8e55-4b57-a25f-cdc76dccba42',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted','deliver1',19),('274ebdcf-f4e7-4358-9c8a-caf2990b8c5d',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted','deliver1',20),('436cf0cc-5cd3-4640-add3-51dfcf14a620',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',20),('f06526d7-b33d-4418-9e7c-c0bbf21aee30',1,2,'水煮雞肉健康餐盒','1','120','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',19),('0887f437-ebbf-437a-a238-1329f08f78cf',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted',NULL,NULL),('bf288ba0-bb7b-4828-a240-631d3f3b3d14',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted','deliver1',19),('c4265fa6-82bf-4d6f-92ad-b489b65ddfc1',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','delivered','deliver1',20),('481f6fc5-7f0c-40e1-8c1d-d9090e6d845e',1,1,'原味蛋餅','1','30','710038台南市永康區康橋大道255號','23.0247416','120.2376688','accepted','deliver1',28),('0eaf71fe-9ba2-4a28-8b33-eb80e82f1b49',1,1,'原味蛋餅','1','30','11169台北市士林區承德路五段55號','25.0981175','121.515366','delivered','deliver1',220),('2c52026d-a01e-481d-a996-41677eb77f23',1,1,'原味蛋餅','1','30','台灣大學','25.0173405','121.5397518','delivered','deliver1',222),('2f19c192-c237-4e52-964a-1b6a08b5c0f9',1,1,'原味蛋餅','1','30','台灣大學','25.0173405','121.5397518','delivered','deliver1',222),('02904fe7-9516-4cec-a438-e9121b925932',1,1,'原味蛋餅','1','30','11169台北市士林區承德路五段55號','25.0981175','121.515366','delivered','deliver1',220),('30e936ca-a7d7-41c1-bea7-9a3f4b6a0bcf',1,1,'原味蛋餅','1','30','11169台北市士林區承德路五段55號','25.0981175','121.515366','delivered','deliver1',220),('ac0412d5-9a10-4b1b-ad05-5d1932ed0175',1,1,'原味蛋餅','1','30','70041台南市中西區忠義路二段1號','22.990257','120.2022981','delivered','deliver1',33),('dae12647-4151-403f-9e70-5fb6a83fb7c6',24,4,'烤全雞','1','300','801高雄市前金區中華三路68號','22.6272943','120.2973646','pending',NULL,NULL);
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

-- Dump completed on 2024-02-19 23:31:13
