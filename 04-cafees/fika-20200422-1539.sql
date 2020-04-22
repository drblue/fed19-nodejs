-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 22, 2020 at 03:38 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fika`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafees`
--

DROP TABLE IF EXISTS `cafees`;
CREATE TABLE `cafees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cafees`
--

INSERT INTO `cafees` (`id`, `name`, `address`, `city`, `owner_id`) VALUES
(1, 'Espresso House, Lund C', 'Bangatan 1', 'Lund', NULL),
(2, 'Ebbas Skafferi', 'Bytaregränd 5', 'Lund', NULL),
(3, 'Espresso House, Väla', 'Marknadsvägen 9', 'Ödåkra', NULL),
(5, 'Starbucks, Malmö C', NULL, 'Malmö', NULL),
(6, 'Espresso House, Emporia', '', 'Malmö', NULL),
(7, 'Hemma hos Johan', '', 'Lund', NULL),
(9, 'Hemma hos Bus-Peter', 'Busgatan 1', 'Ölstad', NULL),
(13, 'Pelles Pannkakor & Pizza', 'Gräddvägen 1-2', 'Syltby', NULL),
(23, 'Bengans Bakelser, Bank och Bröd', 'Bakvägen 3-5', 'Bakby', 3),
(24, 'Dennis Dadlar & Data', 'Bitvägen 1337', 'Databy', 3),
(26, 'Kristines Kanelbullar', 'Bullvägen 1', 'Bagarby', NULL),
(27, 'Stinas Smaskiga Sötsaker', 'Godisgatan 1-3', 'Kariesstad', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cafee_category`
--

DROP TABLE IF EXISTS `cafee_category`;
CREATE TABLE `cafee_category` (
  `id` int(11) NOT NULL,
  `cafee_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cafee_category`
--

INSERT INTO `cafee_category` (`id`, `cafee_id`, `category_id`) VALUES
(1, 23, 1),
(2, 24, 1),
(3, 24, 2),
(4, 27, 1),
(5, 27, 2),
(6, 7, 3),
(7, 7, 4);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Fika'),
(2, 'Lunch'),
(3, 'Middag'),
(4, 'After Work');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `first_name`, `last_name`, `email`, `phone`) VALUES
(1, 'Adam', 'Bertilsson', NULL, NULL),
(2, 'Kalle', 'Anka', 'kalle@anka.se', NULL),
(3, 'Sean', 'Banan', 'kingen@chiqita.se', '08-BANANANA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafees`
--
ALTER TABLE `cafees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cafee_category`
--
ALTER TABLE `cafee_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafees`
--
ALTER TABLE `cafees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `cafee_category`
--
ALTER TABLE `cafee_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
