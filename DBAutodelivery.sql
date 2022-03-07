/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.20-MariaDB : Database - barcodeautodelivery
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`barcodeautodelivery` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `barcodeautodelivery`;

/*Table structure for table `cameralist` */

DROP TABLE IF EXISTS `cameralist`;

CREATE TABLE `cameralist` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `cam_model` varchar(32) DEFAULT NULL,
  `phone_num` varchar(32) DEFAULT NULL,
  `serial_num` varchar(32) DEFAULT NULL,
  `uid` varchar(32) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `start_hour` time DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `client_name` varchar(32) DEFAULT NULL,
  `remarks` varchar(32) DEFAULT NULL,
  `allow` char(1) DEFAULT NULL,
  `req_time` date DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `idx` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

/*Data for the table `cameralist` */

insert  into `cameralist`(`idx`,`cam_model`,`phone_num`,`serial_num`,`uid`,`start_time`,`start_hour`,`end_time`,`end_hour`,`client_name`,`remarks`,`allow`,`req_time`) values 
(46,'不确定','13190033097','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-09','00:00:00','2022-05-10','00:00:00','不确定','试用版','2','2022-05-10'),
(48,'不确定','13190039903','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-10','01:35:00','2021-11-25','01:35:00','不确定','试用版','1','2022-11-15'),
(51,'不确定','13890055555','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-10','00:00:00','2021-11-10','00:00:00','不确定','试用版',NULL,NULL),
(52,'不确定','15526744101','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-10','02:32:00','2022-05-11','02:32:00','不确定','试用版','2','2022-05-11'),
(67,'不确定','13190039999','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9P','2021-11-10','04:19:00','2022-02-10','04:19:00','不确定','试用版','2','2022-02-10'),
(68,'不确定','13133339999','861469925','1QOA46R-1IB809S-1PYIP76-1KE8HAA','2021-11-12','02:27:00','2021-11-27','02:27:00','不确定','试用版',NULL,NULL);

/*Table structure for table `devicelist` */

DROP TABLE IF EXISTS `devicelist`;

CREATE TABLE `devicelist` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `phone_num` char(11) NOT NULL,
  KEY `idx` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `devicelist` */

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `cam_model` char(32) DEFAULT NULL,
  `phone_num` char(24) DEFAULT NULL,
  `serial_num` char(24) DEFAULT NULL,
  `uid` char(32) DEFAULT NULL,
  `send_time` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `message` char(128) DEFAULT NULL,
  `image` char(64) DEFAULT NULL,
  KEY `idx` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

/*Data for the table `messages` */

insert  into `messages`(`idx`,`cam_model`,`phone_num`,`serial_num`,`uid`,`send_time`,`message`,`image`) values 
(102,'不确定','13155564547','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-09 19:36:22','hi.','null'),
(103,'不确定','13190033097','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-09 22:23:04','应该及时向百度反映，或者在其网站页面中根据拒绝蜘蛛协议','null'),
(104,'不确定','13190033097','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-09 22:23:30','任何通过使用百度而搜索链接到的第三方网页均系他人制作或提供','null'),
(105,'不确定','13190033097','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-09 22:23:43','统一社会信用代码/注册号：91110000802100433B\n注册资本：1342128万元','null'),
(106,'不确定','13133339999','861469925','1QOA46R-1IB809S-1PYIP76-1KE8HAA','2021-11-12 02:28:21','北京百度网讯科技有限公司','null'),
(107,'不确定','13190039903','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-13 00:18:59','hi........','null'),
(108,'不确定','13133339999','861469925','1QOA46R-1IB809S-1PYIP76-1KE8HAA','2021-11-15 13:49:27','Good morning.','null'),
(109,'不确定','13190039903','861469925','1QOA46R-1IB809S-1PYIP76-1KE8H9Z','2021-11-15 13:52:27','Nice....','null');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `id` char(32) DEFAULT NULL,
  `name` char(32) DEFAULT NULL,
  `phone_num` char(11) DEFAULT NULL,
  `email` char(32) DEFAULT NULL,
  `company` char(64) DEFAULT NULL,
  `job_title` char(64) DEFAULT NULL,
  `pw` char(32) DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  KEY `idx` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`idx`,`id`,`name`,`phone_num`,`email`,`company`,`job_title`,`pw`,`level`) values 
(1,'admin','shotaro teo','15526734852','shataroteo@gmail.com','We can soft','CEO','a00000!@',1),
(8,'boss','JamseLee','13175687978',NULL,'KBB bgd','manager','b00000!@',2),
(9,'rupan','Arcenu rupan','13876765654','chongil@gmail.com','Zoo topia','manager','c00000!@',2),
(10,'admin00','android','13156786565','shoatro@gmail.com','wecansoft','staff','undefined',1),
(12,'boss000','koingdom','13545467567',NULL,'aluminate','boss','b00000!@',2),
(14,'rupan000','rupan3th','15512345678',NULL,'kbb','steel','c00000!@',2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
