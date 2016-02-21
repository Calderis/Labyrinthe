-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Host: 10.246.17.13:3306
-- Generation Time: Jun 01, 2014 at 10:06 PM
-- Server version: 5.5.37-MariaDB-1~wheezy
-- PHP Version: 5.3.3-7+squeeze15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `magnhetic_fr`
--

-- --------------------------------------------------------

--
-- Table structure for table `membres`
--

CREATE TABLE IF NOT EXISTS `membres` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `passe` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `membres`
--

INSERT INTO `membres` (`id`, `pseudo`, `passe`, `email`) VALUES
(1, 'pierre25', '38ef05e58f780df192a1c430db532eac04e56dc7', 'pirate150@hotmail.fr'),
(4, 'hhh', 'effdb5f96a28acd2eb19dcb15d8f43af762bd0ae', 'r.wetteren@live.fr'),
(5, 'test', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'r.wetteren@live.fr'),
(6, 'Test', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'r.wetteren@live.fr'),
(7, 'Calderis', '85c4120d65ef964958fd47cc76e9b5fc53d266d8', 'r.wetteren@gmail.com'),
(8, 'Pape', '5f6955d227a320c7f1f6c7da2a6d96a851a8118f', 'matt_tourdes@hotmail.fr'),
(9, 'spycher', 'b62347e1821fb6ee6f5f9a4e158a927590c2fa7f', 'sare.swann@gmail.com'),
(10, 'aaaa', '70c881d4a26984ddce795f6f71817c9cf4480e79', 'odrel@gamersorigin.com'),
(11, 'sfsf', '4bcd0cb4ee6de746a1761595c6dd7251de61cee3', 'sfsf@sfsf.com'),
(12, 'Luiji', '5683b32d9da3fe83cef1e284dc210e768d02b7cf', 'prout@glgklf.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
