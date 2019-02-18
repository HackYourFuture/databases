/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: list
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `due_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: reminders
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reminder` datetime DEFAULT NULL,
  `list_Id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `list_Id` (`list_Id`),
  CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`list_Id`) REFERENCES `list` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: task
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `done` enum('T', 'F') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: list
# ------------------------------------------------------------

INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (1, 1, 'Shopping', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (2, 2, 'work', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (3, 1, 'personal', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (4, 4, 'wishlist', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (5, 2, 'wishlist', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (6, 5, 'study', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (7, 6, 'sport', NULL);
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (8, 1, 'new list', '2019-03-02');
INSERT INTO
  `list` (`id`, `user_id`, `name`, `due_date`)
VALUES
  (9, 1, 'vacation', '2019-03-08');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: reminders
# ------------------------------------------------------------

INSERT INTO
  `reminders` (`id`, `reminder`, `list_Id`)
VALUES
  (1, '2019-03-01 12:00:10', 8);
INSERT INTO
  `reminders` (`id`, `reminder`, `list_Id`)
VALUES
  (2, '2019-03-07 12:00:10', 9);
INSERT INTO
  `reminders` (`id`, `reminder`, `list_Id`)
VALUES
  (3, '2019-02-20 12:00:00', 2);
INSERT INTO
  `reminders` (`id`, `reminder`, `list_Id`)
VALUES
  (4, '2019-02-22 12:00:00', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: task
# ------------------------------------------------------------

INSERT INTO
  `task` (`id`, `list_id`, `name`, `tag`, `done`)
VALUES
  (10, 1, 'BAnana', 'pend', 'T');
INSERT INTO
  `task` (`id`, `list_id`, `name`, `tag`, `done`)
VALUES
  (13, 3, 'play soccer', 'trainig', 'F');
INSERT INTO
  `task` (`id`, `list_id`, `name`, `tag`, `done`)
VALUES
  (14, 2, 'walk', '', 'T');
INSERT INTO
  `task` (`id`, `list_id`, `name`, `tag`, `done`)
VALUES
  (15, 2, 'Eat', '', 'F');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user
# ------------------------------------------------------------

INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (1, 'John', 'john@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (2, 'Julia', 'julia@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (3, 'Ali', 'ali@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (4, 'Bon', 'bon@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (5, 'Zayd', 'zayd@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (6, 'Amon', 'amon@hyf.net');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (7, 'Yostina', 'yostina@gmail.com');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (11, 'Setna', 'setna@gmail.com');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (13, '?', '?');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (18, 'KO', 'kis@ames.com');
INSERT INTO
  `user` (`id`, `name`, `email`)
VALUES
  (20, 'KO', 'new@ames.com');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
