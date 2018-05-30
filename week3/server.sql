CREATE TABLE `customer` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `f_name` varchar(35) NOT NULL,
  `l_name` varchar(35) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `Address` varchar(255) NOT NULL
);

CREATE TABLE `product` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `EAN` varchar(13) NOT NULL,
  `name` varchar(255) NOT NULL,
  `BBD` date NOT NULL
);


CREATE TABLE `cart` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer` (`ID`)
);

CREATE TABLE `order` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Date` datetime NOT NULL,
  `cart_id` int NOT NULL,
  FOREIGN KEY (`cart_id`) REFERENCES `cart` (`ID`)
);

CREATE TABLE `shipping` (
  `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `date` datetime NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `order` (`ID`)
);


