-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3310
-- Время создания: Дек 13 2023 г., 15:28
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `AZS_VACANCIES`
--

-- --------------------------------------------------------

--
-- Структура таблицы `all_active_vacancies`
--

CREATE TABLE `all_active_vacancies` (
  `azs_id` int NOT NULL,
  `vacancy_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `all_active_vacancies`
--

INSERT INTO `all_active_vacancies` (`azs_id`, `vacancy_id`) VALUES
(1, 1),
(1, 2),
(1, 7),
(12, 1),
(13, 2),
(14, 7),
(612, 1),
(21, 2),
(22, 7),
(34, 1),
(34, 2),
(78, 7),
(99, 3),
(201, 2),
(201, 9),
(65, 8),
(24, 6),
(65, 5),
(11, 4),
(11, 2),
(8, 9),
(230, 1),
(230, 4),
(230, 5),
(5, 1),
(634, 1),
(173, 9),
(173, 1),
(173, 1),
(173, 1),
(237, 5),
(331, 6),
(9985, 2),
(457, 10),
(457, 2),
(458, 10),
(234, 5),
(684, 6),
(7704, 8),
(7702, 3),
(234, 2),
(685, 10),
(21042, 9),
(28, 10),
(27, 5),
(29, 8),
(44, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
